'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Loading from '@/src/components/Loading';
import LoadingError from '@/src/components/LoadingError';
import TitleShopPages from '@/src/components/TitleShopPages';
import useFetch from '@/src/hooks/useFetch';
import { type IDataFromDB } from '@/src/types/interfaсes';
import styles from '../../../../styles/pages/categories.module.scss';

interface IParams {
  shop: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function ShopPage(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const urls = useMemo(
    () => [`${API_HOST}/shops/filter?shopId=${params.shop}`, `${API_HOST}/categories`],
    [API_HOST, params]
  );
  const { data, isLoading, isError } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = []] = data;

  function showCategories(): JSX.Element {
    return (
      <>
        <TitleShopPages shopResult={shopResult} />
        <div className={`${styles.products} ${styles.cards}`}>
          {categoriesResult.map((category: IDataFromDB) => (
            <Link
              className={styles.cardLink}
              href={`/portal/shops/${params.shop}/${category.id}`}
              key={category.id}
            >
              <div className={styles.card}>
                {/* <Image
                  className={styles.cardImg}
                  src={`/img/categories/${category.id}.jpg`}
                  width={150}
                  height={120}
                  alt="shop"
                /> */}
                <div className={styles.cardName}>{category.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return isLoading ? <Loading /> : isError ?? false ? <LoadingError /> : <>{showCategories()}</>;
}
