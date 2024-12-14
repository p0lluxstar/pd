import { type ITransformedDataForChart, type IProductDataForChart } from '../types/interfaсes';

export default function transformDataForChart(
  props: IProductDataForChart[]
): ITransformedDataForChart {
  const transformed = {
    date: [] as string[],
    prices: [] as number[],
  };

  let numSlice;

  'name' in props[0] ? (numSlice = 1) : (numSlice = 0); // если открывается страница товара из раздела 'магазины' тогда 0

  props.slice(numSlice).forEach((price: IProductDataForChart) => {
    const [year, month, day] = price.date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    transformed.date.push(formattedDate);
    transformed.prices.push(Number(price.price));
  });

  return transformed;
}
