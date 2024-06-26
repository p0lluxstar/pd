'use client';

import { useMemo } from 'react';
import Categories from '@/src/components/Categories';
import Loader from '@/src/components/Loader';
import useFetch from '@/src/hooks/useFetch';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function Category0001(): JSX.Element {
  const urls = useMemo(
    () => [
      `${API_HOST}/categories/filter?categoryId=category-0001`,
      `${API_HOST}/products/filter?categoryId=category-0001`,
    ],
    [API_HOST]
  );

  const { data, isLoader } = useFetch(urls);

  const [categoriesResult = [], productsResult = []] = data;

  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <Categories categoriesResult={categoriesResult} productsResult={productsResult} />
      )}
    </>
  );
}
