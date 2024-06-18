'use client';

import Categories from '@/src/components/Categories';
import Loader from '@/src/components/Loader';
import useFetchData from '@/src/hooks/useFetchData';

export default function Category0001(): JSX.Element {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const urls = [
    `${API_HOST}/categories/filter?categoryId=category-0001`,
    `${API_HOST}/products/filter?categoryId=category-0001`,
  ];
  const { data, isLoader } = useFetchData(urls);

  const [categoriesResult = [], productsResult = []] = data;

  return (
    <>
      {isLoader ? (
        <Categories categoriesResult={categoriesResult} productsResult={productsResult} />
      ) : (
        <Loader />
      )}
    </>
  );
}
