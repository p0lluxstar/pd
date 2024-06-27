'use client';

import { useMemo } from 'react';
import Categories from '@/src/components/Categories';
import Loading from '@/src/components/Loading';
import useFetch from '@/src/hooks/useFetch';
import LoadingError from './LoadingError';

interface IProps {
  categoryId: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function GeneralCategoryPage(props: IProps): JSX.Element {
  const urls = useMemo(
    () => [
      `${API_HOST}/categories/filter?categoryId=${props.categoryId}`,
      `${API_HOST}/products/filter?categoryId=${props.categoryId}`,
    ],
    [API_HOST]
  );

  const { data, isLoading, isError } = useFetch(urls);

  const [categoriesResult = [], productsResult = []] = data;

  return isLoading ? (
    <Loading />
  ) : isError ?? false ? (
    <LoadingError />
  ) : (
    <Categories categoriesResult={categoriesResult} productsResult={productsResult} />
  );
}
