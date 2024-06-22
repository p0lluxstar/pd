'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ChartLine from '@/src/components/ChartLine';
import DateInputForm from '@/src/components/DateInputForm';
import Loader from '@/src/components/Loader';
import TitleShopPages from '@/src/components/TitleShopPages';
import useFetch from '@/src/hooks/useFetch';
import { type ITransformedDataForChart } from '@/src/types/interfaсes';
import fetchUpdatedData from '@/src/utils/fetchUpdatedData';
import getCurrentAndLastDateFormatted from '@/src/utils/getCurrentAndLastDateFormatted';
import transformDataForChart from '@/src/utils/transformDataForChart';

interface IParams {
  shop: string;
  category: string;
  product: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function ProductPage(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const dates = getCurrentAndLastDateFormatted();

  const urls = useMemo(
    () => [
      `${API_HOST}/shops/filter?shopId=${params.shop}`,
      `${API_HOST}/categories/filter?categoryId=${params.category}`,
      `${API_HOST}/products/filter?productId=${params.product}`,
      `${API_HOST}/prices-${params.shop}/filter?productId=${params.product}&startDate=${dates.startDate}&endDate=${dates.endDate}`,
    ],
    [API_HOST, params]
  );

  const { data, isLoader } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = [], productsResult = [], pricesProductResult = []] =
    data;

  const [transformedData, setTransformedData] = useState<ITransformedDataForChart>({
    date: [],
    prices: [],
  });

  useEffect(() => {
    setTransformedData(transformDataForChart(pricesProductResult));
  }, [pricesProductResult]);

  const handleUpdateData = async (startDateInput: string, endDateInput: string): Promise<void> => {
    const updateData = await fetchUpdatedData(params, startDateInput, endDateInput);
    setTransformedData(transformDataForChart(updateData));
  };

  function showProduct(): JSX.Element {
    return (
      <>
        <TitleShopPages
          params={params}
          shopResult={shopResult}
          categoriesResult={categoriesResult}
          productsResult={productsResult}
        />
        <DateInputForm
          startDateProps={dates.startDate}
          endDateProps={dates.endDate}
          onUpdateData={handleUpdateData}
        />
        <ChartLine date={transformedData.date} price={transformedData.prices} />
      </>
    );
  }

  return <>{isLoader ? showProduct() : <Loader />}</>;
}
