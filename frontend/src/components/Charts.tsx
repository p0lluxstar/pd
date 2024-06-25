import Link from 'next/link';
import { type IProductDataForChart } from '../types/interfaсes';
import transformDataForChart from '../utils/transformDataForChart';
import ChartLine from './ChartLine';

interface IProps {
  data: any[];
  isShop: string | undefined;
}

export default function Charts(props: IProps): JSX.Element {
  return (
    <>
      <div>
        {props.data.map((productData: IProductDataForChart[], index) => {
          const chartData = transformDataForChart(productData);
          return (
            <div key={index}>
              {props.isShop === undefined && (
                <h2>
                  Магазин{' '}
                  <Link href={`/portal/shops/${productData[0].shopId}`}>
                    {productData[0].shopName}
                  </Link>
                </h2>
              )}
              <ChartLine date={chartData.date} price={chartData.prices} />
            </div>
          );
        })}
      </div>
    </>
  );
}
