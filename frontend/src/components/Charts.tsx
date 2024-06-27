import Link from 'next/link';
import { type IProductDataForChart } from '../types/interfaсes';
import transformDataForChart from '../utils/transformDataForChart';
import ChartLine from './ChartLine';

interface IProps {
  productData: any[];
}

export default function Charts(props: IProps): JSX.Element {
  // объединяем данные массивов 1 и 2, 3 и 4 и тд
  const combinedArray = props.productData.reduce<any[][]>((result, current, index) => {
    if (index % 2 === 0) {
      result.push(current);
    } else {
      result[result.length - 1] = result[result.length - 1].concat(current);
    }

    return result;
  }, []);

  return (
    <>
      <div>
        {combinedArray.map((productData: IProductDataForChart[], index) => {
          const chartData = transformDataForChart(productData);
          return (
            <div key={index}>
              {
                (props.productData.length > 1 && (
                  <h2>
                    Магазин{' '}
                    <Link href={`/portal/shops/${productData[0].id}`}>«{productData[0].name}»</Link>
                  </h2>
                ))}
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
