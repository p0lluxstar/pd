'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Loader from '@/src/components/Loader';
import TitleShopPages from '@/src/components/TitleShopPages';
import useFetch from '@/src/hooks/useFetch';
import { type IDataFromDB } from '@/src/types/interfaсes';
import styles from '../../../../styles/pages/temp.module.scss';

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
  const { data, isLoader } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = []] = data;

  function showCategories(): JSX.Element {
    return (
      <>
        <TitleShopPages shopResult={shopResult} />
        <div className={styles.products}>
          {categoriesResult.map((category: IDataFromDB) => (
            <Link href={`/portal/shops/${params.shop}/${category.id}`} key={category.id}>
              <div>{category.name}</div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return <>{isLoader ? <Loader /> : showCategories()}</>;
}
