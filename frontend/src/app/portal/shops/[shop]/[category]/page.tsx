'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ChartsInShops from '@/src/components/ChartsInShops';
import DateInputForm from '@/src/components/DateInputForm';
import Loading from '@/src/components/Loading';
import LoadingError from '@/src/components/LoadingError';
import TitleShopPages from '@/src/components/TitleShopPages';
import useFetch from '@/src/hooks/useFetch';
import getDatesFromLS from '@/src/utils/getDatesFromLS';

interface IParams {
  shop: string;
  category: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function CategoryPage(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const datesFromLS = getDatesFromLS();
  const [urls, setUrls] = useState<string[]>([]);

  const handleUpdateData = (): void => {
    setFetchTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (API_HOST != null && params.shop.length > 0 && params.category.length > 0) {
      setUrls([
        `${API_HOST}/shops/filter?shopId=${params.shop}`,
        `${API_HOST}/categories/filter?categoryId=${params.category}`,
      ]);
    }
  }, [API_HOST, params, fetchTrigger]);

  const { data, isLoading, isError } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = []] = data;

  return isLoading ? (
    <Loading />
  ) : isError ?? false ? (
    <LoadingError />
  ) : (
    <>
      <TitleShopPages params={params} shopResult={shopResult} categoriesResult={categoriesResult} />
      <DateInputForm
        startDateProps={datesFromLS.startDate}
        endDateProps={datesFromLS.endDate}
        onUpdateData={handleUpdateData}
      />
      <ChartsInShops />
    </>
  );
}
