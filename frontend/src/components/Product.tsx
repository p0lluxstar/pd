'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import getCurrentAndLastDateFormatted from '../utils/getCurrentAndLastDateFormatted';
import transformDataForChart from '../utils/transformDataForChart';
import ChartLine from './ChartLine';
import Loader from './Loader';
import ShopsCheckboxForm from './ShopsCheckboxForm';
import fetchUpdatedData from '../utils/fetchUpdatedData';
import TitleCategoryPages from './TitleCategoryPages';

interface IParams {
  category: string;
  product: string;
}

type CheckedItems = Record<string, boolean>;

export default function Product(): JSX.Element {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const params = useParams() as unknown as IParams;
  const dates = getCurrentAndLastDateFormatted();
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const savedShopsCheckedItems: CheckedItems = JSON.parse((localStorage.getItem('shopsCheckboxItems')) ?? '{}');
  const urls = [`${API_HOST}/products/filter?productId=${params.product}`];
  Object.keys(savedShopsCheckedItems).forEach((key) => {
    if (savedShopsCheckedItems[key]) {
      urls.push(
        `${API_HOST}/prices-${key}/filter?productId=${params.product}&startDate=${dates.lastDate}&endDate=${dates.currentDate}`
      );
    }
  });

  const { data, isLoader } = useFetchData(urls, fetchTrigger);

  const updateFetchTrigger = (): void => {
    setFetchTrigger((prev) => prev + 1); // Обновляем состояние, чтобы вызвать перерендеринг
  };

  function renderCharts(): JSX.Element {
    return (
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
  }

  /*  return <>{isLoader ? showProduct() : <Loader />}</>; */
  return (
    <>
      {data.length > 0 && (
        <TitleCategoryPages
          categoryId={data[0][0].category_id.id}
          categoryName={data[0][0].category_id.name}
          productName={data[0][0].name}
        />
      )}
      <ShopsCheckboxForm updateDataCharts={updateFetchTrigger} />
      {renderCharts()}
    </>
  );
}
