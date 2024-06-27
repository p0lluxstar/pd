'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import Loading from '@/src/components/Loading';
import LoadingError from '@/src/components/LoadingError';
import useFetch from '@/src/hooks/useFetch';
import { type IDataFromDB } from '@/src/types/interfaсes';
import styles from '../../../styles/pages/shops.module.scss';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function ShopsPage(): JSX.Element {
  const urls = useMemo(() => [`${API_HOST}/shops`], [API_HOST]);
  const { data, isLoading, isError } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = []] = data;

  function showShops(): JSX.Element {
    return (
      <>
        <h1>Магазины</h1>
        <div className={styles.shops}>
          {shopResult.map((shop: IDataFromDB) => (
            <Link href={`/portal/shops/${shop.id}`} key={shop.id}>
              <div className={styles.shop}>
                <Image src={`/img/shops/${shop.id}.jpg`} width={200} height={100} alt="shop" />
                <div className={styles.name}>{shop.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return isLoading ? <Loading /> : isError ?? false ? <LoadingError /> : <>{showShops()}</>;
}
