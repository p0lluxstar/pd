import { type IDataFromDB } from '../types/interfaсes';

interface IParams {
  shop: string;
  category: string;
  product: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default async function fetchUpdatedData(
  params: IParams,
  startDate: string,
  endDate: string
): Promise<IDataFromDB[]> {
  const response = await fetch(
    `${API_HOST}/prices-${params.shop}/filter?productId=${params.product}&startDate=${startDate}&endDate=${endDate}`
  );
  const result = await response.json();

  return result;
}
