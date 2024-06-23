'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChartLine from '@/src/components/ChartLine';
import DateInputForm from '@/src/components/DateInputForm';
import Loader from '@/src/components/Loader';
import TitleShopPages from '@/src/components/TitleShopPages';
import useFetch from '@/src/hooks/useFetch';
import { IStoreReducer, type ITransformedDataForChart } from '@/src/types/interfaсes';
import getCurrentAndLastDateFormatted from '@/src/utils/getCurrentAndLastDateFormatted';
import transformDataForChart from '@/src/utils/transformDataForChart';
import useFetchChart from '@/src/hooks/useFetchChart';
import ChartWithDateForm from '@/src/components/ChartWithDateForm';
import { useDispatch, useSelector } from 'react-redux';
import { loaderActions } from '@/src/redux/slices/loaderSlice';

interface IParams {
  shop: string;
  category: string;
  product: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function ProductPage(): JSX.Element {
  const params = useParams() as unknown as IParams;

  const [urls, setUrls] = useState<string[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const createUrls = () => {
      const baseUrls = [
        `${API_HOST}/shops/filter?shopId=${params.shop}`,
        `${API_HOST}/categories/filter?categoryId=${params.category}`,
        `${API_HOST}/products/filter?productId=${params.product}`,
      ];

      setUrls(baseUrls);
    };

    createUrls();
  }, []);

  const { data, isLoader } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = [], productsResult = []] = data;

  function showProduct(): JSX.Element {
    return (
      <>
        <TitleShopPages
          params={params}
          shopResult={shopResult}
          categoriesResult={categoriesResult}
          productsResult={productsResult}
        />
        <ChartWithDateForm/>
      </>
    );
  }
  console.log('isLoader', isLoader);

  return <>{isLoader ? showProduct() : <Loader />}</>;
}
