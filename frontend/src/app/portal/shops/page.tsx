'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext, useMemo } from 'react';
import Loading from '@/src/components/Loading';
import LoadingError from '@/src/components/LoadingError';
import { ThemeContext } from '@/src/context/ThemeContextProvider';
import useFetch from '@/src/hooks/useFetch';
import { type IDataFromDB } from '@/src/types/interfaсes';
import darkStyles from '../../../styles/pages/shopPage/darkShopPage.module.scss';
import lightStyles from '../../../styles/pages/shopPage/lightShopPage.module.scss';
import styles from '../../../styles/pages/shopPage/shopPage.module.scss';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function ShopsPage(): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;
  const urls = useMemo(() => [`${API_HOST}/shops`], [API_HOST]);
  const { data, isLoading, isError } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = []] = data;

  function showShops(): JSX.Element {
    return (
      <>
        <h1>Магазины</h1>
        <div className={`${themeStyles.shops} ${styles.cards}`}>
          {shopResult.map((shop: IDataFromDB) => (
            <Link className={styles.cardLink} href={`/portal/shops/${shop.id}`} key={shop.id}>
              <div className={`${styles.card} ${themeStyles.card}`}>
                <Image
                  className={styles.cardImg}
                  src={`/img/shops/${shop.id}.png`}
                  width={200}
                  height={100}
                  alt="shop"
                />
                <div className={styles.cardName}>{shop.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return isLoading ? <Loading /> : isError ?? false ? <LoadingError /> : <>{showShops()}</>;
}
