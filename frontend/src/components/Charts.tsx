'use client';

import Link from 'next/link';
import styles from '../styles/components/сharts.module.scss';
import { type IProductDataForChart } from '../types/interfaсes';
import transformDataForChart from '../utils/transformDataForChart';
import ChartLine from './ChartLine';
import PriceChange from './PriceChange';

interface IProps {
  productData: any[];
}

export default function Charts(props: IProps): JSX.Element {
  // объединяем данные массивов 1 и 2, 3 и 4 и тд если приходит больше одного массива
  const combinedArray =
    props.productData.length === 1
      ? [[{}, ...props.productData[0]]]
      : props.productData.reduce((result: Array<Array<{ id: number }>>, current, index) => {
          if (index % 2 === 0) {
            result.push(current);
          } else {
            result[result.length - 1] = result[result.length - 1].concat(current);
          }
          return result;
        }, []);

  return (
    <>
      <div className={styles.charts}>
        {combinedArray.map((productData: IProductDataForChart[], index) => {
          const chartData = transformDataForChart(productData);

          const startPrice = chartData.prices[0];
          const endPrice = chartData.prices[chartData.prices.length - 1];

          return (
            <div className={styles.chart} key={index}>
              {props.productData.length > 1 && (
                <h2 className={styles.chartTitle}>
                  Магазин{' '}
                  <Link href={`/portal/shops/${productData[0].id}`}>«{productData[0].name}»</Link>
                </h2>
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
