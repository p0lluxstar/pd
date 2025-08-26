'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import useFetch from '../hooks/useFetch';
import styles from '../styles/components/chartInCategories/chartsInCategories.module.scss';
import darkStyles from '../styles/components/chartInCategories/darkChartsInCategories.module.scss';
import lightStyles from '../styles/components/chartInCategories/lightChartsInCategories.module.scss';
import { type IProductDataForChart, type IShop } from '../types/interfaсes';
import transformDataForChart from '../utils/transformDataInCategories';
import ChartLine from './ChartLine';
import Loading from './Loading';
import LoadingError from './LoadingError';
import PriceChange from './PriceChange';

interface IProps {
  productData?: [Array<IShop | IProductDataForChart>];
  urls: string[];
}

type CombinedArrayItem = IShop | IProductDataForChart;
type CombinedArray = CombinedArrayItem[];

export default function ChartsInCategories(props: IProps): JSX.Element {
  const { data, isLoading, isError } = useFetch(props.urls);
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  // Объединяем данные массивов 1 и 2, 3 и 4 и т.д., если приходит больше одного массива
  let combinedArray: CombinedArray[] = [];

  if (data.length === 1) {
    combinedArray = [[...data[0]]];
  } else {
    combinedArray = data.reduce<CombinedArray[]>((result, current, index) => {
      if (index % 2 === 0) {
        result.push(current as CombinedArray);
      } else {
        result[result.length - 1] = result[result.length - 1].concat(current as CombinedArray);
      }
      return result;
    }, []);
  }

  if (isLoading) return <Loading />;
  if (isError ?? false) return <LoadingError />;

  return (
    <>
      <div className={styles.charts}>
        {combinedArray.map((productData, index) => {
          const chartData = transformDataForChart(productData as IProductDataForChart[]);
          return (
            <div className={`${themeStyles.chart} ${styles.chart}`} key={index}>
              {data.length > 1 && (
                <div className={styles.chartTitleWrapper}>
                  <h2 className={`${themeStyles.chartTitle} ${styles.chartTitle}`}>
                    Магазин{' '}
                    <Link href={`/portal/shops/${(productData[0] as IShop).id}`}>
                      «{(productData[0] as IShop).name}»
                    </Link>
                  </h2>
                  <Link href={`/portal/shops/${productData[0].id}`}>
                    <Image
                      className={`${themeStyles.shopImg} ${styles.shopImg}`}
                      src={`/img/shops/${productData[0].id}.png`}
                      width={90}
                      height={45}
                      alt="shop"
                    />
                  </Link>
                </div>
              )}
              <PriceChange data={chartData.prices} />
              {chartData.date.length > 0 ? (
                <ChartLine date={chartData.date} price={chartData.prices} />
              ) : (
                <div className={`${themeStyles.noData} ${styles.noData}`}>Нет данных</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
