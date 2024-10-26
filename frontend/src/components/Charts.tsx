'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/components/сharts.module.scss';
import { type IProductDataForChart, type IShop } from '../types/interfaсes';
import transformDataForChart from '../utils/transformDataForChart';
import ChartLine from './ChartLine';
import PriceChange from './PriceChange';

interface IProps {
  productData: [Array<IShop | IProductDataForChart>];
}

type CombinedArrayItem = IShop | IProductDataForChart;
type CombinedArray = CombinedArrayItem[];

export default function Charts(props: IProps): JSX.Element {
  // Объединяем данные массивов 1 и 2, 3 и 4 и т.д., если приходит больше одного массива

  console.log('props.productData', props.productData);
  let combinedArray: CombinedArray[] = [];

  if (props.productData.length === 1) {
    combinedArray = [[...props.productData[0]]];
  } else {
    combinedArray = props.productData.reduce<CombinedArray[]>((result, current, index) => {
      if (index % 2 === 0) {
        result.push(current as CombinedArray);
      } else {
        result[result.length - 1] = result[result.length - 1].concat(current as CombinedArray); // Явное указание типа
      }
      return result;
    }, []);
  }

  return (
    <>
      <div className={styles.charts}>
        {combinedArray.map((productData, index) => {
          const chartData = transformDataForChart(productData as IProductDataForChart[]);
          const startPrice = chartData.prices[0];
          const endPrice = chartData.prices[chartData.prices.length - 1];

          return (
            <div className={styles.chart} key={index}>
              {props.productData.length > 1 && (
                <div className={styles.chartTitleWrapper}>
                  <h2 className={styles.chartTitle}>
                    Магазин{' '}
                    <Link href={`/portal/shops/${(productData[0] as IShop).id}`}>
                      «{(productData[0] as IShop).name}»
                    </Link>
                  </h2>
                  <Image
                    className={styles.cardImg}
                    src={`/img/shops/${productData[0].id}.png`}
                    width={80}
                    height={40}
                    alt="shop"
                  />
                </div>
              )}
              {startPrice !== undefined && endPrice !== undefined && (
                <PriceChange startPrice={startPrice} endPrice={endPrice} />
              )}
              {chartData.date.length > 0 ? (
                <ChartLine date={chartData.date} price={chartData.prices} />
              ) : (
                <div>Нет данных</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
