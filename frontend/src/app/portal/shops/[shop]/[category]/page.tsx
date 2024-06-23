'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Loader from '@/src/components/Loader';
import TitleShopPages from '@/src/components/TitleShopPages';
import useFetch from '@/src/hooks/useFetch';
import { type IDataFromDB } from '@/src/types/interfaсes';

interface IParams {
  shop: string;
  category: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function CategoryPage(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const urls = useMemo(
    () => [
      `${API_HOST}/shops/filter?shopId=${params.shop}`,
      `${API_HOST}/categories/filter?categoryId=${params.category}`,
      `${API_HOST}/prices-${params.shop}/products?categoryId=${params.category}`,
    ],
    [API_HOST, params]
  );
  const { data, isLoader } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = [], productsResult = []] = data;

  function showProducts(): JSX.Element {
    return (
      <>
        <TitleShopPages
          params={params}
          shopResult={shopResult}
          categoriesResult={categoriesResult}
        />

        <div>
          {productsResult.map((product: IDataFromDB) => (
            <Link
              href={`/portal/shops/${params.shop}/${params.category}/${product.id}`}
              key={product.id}
            >
              <div>{product.name}</div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return <>{isLoader ? <Loader /> : showProducts()}</>;
}
