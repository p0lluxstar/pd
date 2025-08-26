'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Breadcrumbs from '@/src/components/Breadcrumbs';
import FilterDate from '@/src/components/FilterDate';
import Loading from '@/src/components/Loading';
import LoadingError from '@/src/components/LoadingError';
import useFetch from '@/src/hooks/useFetch';

interface IParams {
  shop: string;
  category: string;
  product: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function ProductPage(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const urls = useMemo(
    () => [
      `${API_HOST}/shops/filter?shopId=${params.shop}`,
      `${API_HOST}/categories/filter?categoryId=${params.category}`,
      `${API_HOST}/products/filter?productId=${params.product}`,
    ],
    [API_HOST, params]
  );

  /*  useEffect(() => {
    const createUrls = (): void => {
      const baseUrls = [
        `${API_HOST}/shops/filter?shopId=${params.shop}`,
        `${API_HOST}/categories/filter?categoryId=${params.category}`,
        `${API_HOST}/products/filter?productId=${params.product}`,
      ];

      setUrls(baseUrls);
    };

    createUrls();
  }, []); */

  const { data, isLoading, isError } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = [], productsResult = []] = data;

  function showProduct(): JSX.Element {
    return (
      <>
        <Breadcrumbs
          params={params}
          shopResult={shopResult}
          categoriesResult={categoriesResult}
          productsResult={productsResult}
        />
        <FilterDate />
      </>
    );
  }

  return isLoading ? <Loading /> : isError ?? false ? <LoadingError /> : <>{showProduct()}</>;
}
