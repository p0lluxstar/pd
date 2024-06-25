import { type ITransformedDataForChart, type IProductDataForChart } from '../types/interfaсes';

export default function transformDataForChart(
  props: IProductDataForChart[]
): ITransformedDataForChart {
  const transformed = {
    date: [] as string[],
    prices: [] as number[],
  };

  props.forEach((price: IProductDataForChart) => {
    const [year, month, day] = price.date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    transformed.date.push(formattedDate);
    transformed.prices.push(Number(price.price));
  });

  return transformed;
}
