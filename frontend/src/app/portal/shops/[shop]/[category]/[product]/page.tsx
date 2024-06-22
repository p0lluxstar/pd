'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChartLine from '@/src/components/ChartLine';
import DateInputForm from '@/src/components/DateInputForm';
import Loader from '@/src/components/Loader';
import TitleShopPages from '@/src/components/TitleShopPages';
import useFetch from '@/src/hooks/useFetch';
import { type ITransformedDataForChart } from '@/src/types/interfaсes';
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
  const [urls, setUrls] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const getDateFormLS = localStorage.getItem('dateForm');
  const datesFromLS =
    getDateFormLS != null
      ? JSON.parse(getDateFormLS)
      : {
          startDate: dates.startDate,
          endDate: dates.endDate,
        };

  useEffect(() => {
    const createUrls = (startDate: string, endDate: string) => {
      const baseUrls = [
        `${API_HOST}/shops/filter?shopId=${params.shop}`,
        `${API_HOST}/categories/filter?categoryId=${params.category}`,
        `${API_HOST}/products/filter?productId=${params.product}`,
        `${API_HOST}/prices-${params.shop}/filter?productId=${params.product}&startDate=${startDate}&endDate=${endDate}`,
      ];

      setUrls(baseUrls);
    };

    createUrls(datesFromLS.startDate, datesFromLS.endDate);
  }, [fetchTrigger]);

  const { data, isLoader } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = [], productsResult = [], pricesProductResult = []] =
    data;

  const handleUpdateData = (): void => {
    setFetchTrigger((prev) => prev + 1);
  };

  const renderCharts = (): JSX.Element => {
    const chartData = transformDataForChart(pricesProductResult);
    return (
      <>
        <ChartLine date={chartData.date} price={chartData.prices} />
      </>
    );
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
        {renderCharts()}
      </>
    );
  }

  return <>{isLoader ? showProduct() : <Loader />}</>;
}
