import { type ITransformedDataForChart, type IDataFromDB } from '../types/interfaсes';

export default function transformDataForChart(prices: IDataFromDB[]): ITransformedDataForChart {
  const transformed = {
    date: [] as string[],
    prices: [] as number[],
  };

  prices.forEach((price) => {
    const [year, month, day] = price.date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    transformed.date.push(formattedDate);
    transformed.prices.push(price.price);
  });

  return transformed;
}
