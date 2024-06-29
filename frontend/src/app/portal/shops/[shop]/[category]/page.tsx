'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Loading from '@/src/components/Loading';
import LoadingError from '@/src/components/LoadingError';
import TitleShopPages from '@/src/components/TitleShopPages';
import useFetch from '@/src/hooks/useFetch';
import { type IDataFromDB } from '@/src/types/interfaсes';
import styles from '../../../../../styles/pages/products.module.scss';

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
  const { data, isLoading, isError } = useFetch(urls);

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
        <div className={styles.cards}>
          {productsResult.map((product: IDataFromDB) => (
            <Link
              className={styles.cardLink}
              href={`/portal/shops/${params.shop}/${params.category}/${product.id}`}
              key={product.id}
            >
              <div className={styles.card}>
                <Image
                  className={styles.cardImg}
                  src={'/img/products/product-0001.jpg'}
                  width={150}
                  height={120}
                  alt="shop"
                />
                <div className={styles.cardName}>{product.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return isLoading ? <Loading /> : isError ?? false ? <LoadingError /> : <>{showProducts()}</>;
}
