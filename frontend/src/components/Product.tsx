'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { type IStoreReducer } from '../types/interfaсes';
import getCurrentAndLastDateFormatted from '../utils/getCurrentAndLastDateFormatted';
import transformDataForChart from '../utils/transformDataForChart';
import ChartLine from './ChartLine';
import DateInputForm from './DateInputForm';
import Loader from './Loader';
import ShopsCheckboxForm from './ShopsCheckboxForm';
import TitleCategoryPages from './TitleCategoryPages';
import { loaderActions } from '../redux/slices/loaderSlice';

interface IParams {
  category: string;
  product: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function Product(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const dates = getCurrentAndLastDateFormatted();
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);
  const shops = useSelector((state: IStoreReducer) => state.shops);

  const getDateFormLS = localStorage.getItem('dateForm');
  const datesFromLS =
    getDateFormLS != null
      ? JSON.parse(getDateFormLS)
      : {
          startDate: dates.startDate,
          endDate: dates.endDate,
        };

  useEffect(() => {
    const createUrls = (startDate: string, endDate: string): void => {
      const baseUrls = [`${API_HOST}/products/filter?productId=${params.product}`];
      Object.keys(shops).forEach((key) => {
        if (shops[key]) {
          baseUrls.push(
            `${API_HOST}/prices-${key}/filter?productId=${params.product}&startDate=${startDate}&endDate=${endDate}`
          );
        }
      });
      setUrls(baseUrls);
    };

    createUrls(datesFromLS.startDate, datesFromLS.endDate);
  }, [shops, fetchTrigger]);

  const { data, isLoader } = useFetch(urls);

  const handleUpdateData = (): void => {
    setFetchTrigger((prev) => prev + 1);
  };

  const renderCharts = (): JSX.Element => (
    <div>
      {data.slice(1).map((productData, index) => {
        const chartData = transformDataForChart(productData);
        return (
          <div key={index}>
            <h2>Магазин {productData[0].shopName}</h2>
            <ChartLine date={chartData.date} price={chartData.prices} />
          </div>
        );
      })}
    </div>
  );

  function showProduct(): JSX.Element {
    return (
      <>
        {data.length > 0 && (
          <TitleCategoryPages
            categoryId={data[0][0].category_id.id}
            categoryName={data[0][0].category_id.name}
            productName={data[0][0].name}
          />
        )}
        <ShopsCheckboxForm />
        <DateInputForm
          startDateProps={datesFromLS.startDate}
          endDateProps={datesFromLS.endDate}
          onUpdateData={handleUpdateData}
        />
        {data.length > 0 && renderCharts()}
      </>
    );
  }

  return <>{isLoader ? showProduct() : <Loader />}</>;
}
