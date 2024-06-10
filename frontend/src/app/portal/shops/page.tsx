'use client';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '@/src/components/Loader';
import useFetchData from '@/src/hooks/useFetchData';
import { type IDataFromDB } from '@/src/types/interfaсes';
import styles from '../../../styles/pages/shops.module.scss';

export default function ShopsPage(): JSX.Element {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const urls = [`${API_HOST}/shops`];
  const { data, isLoader } = useFetchData(urls);

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

  return <>{isLoader ? showShops() : <Loader />}</>;
}
