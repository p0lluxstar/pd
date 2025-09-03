'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext, useMemo } from 'react';
import { GiMilkCarton, GiManualJuicer, GiChipsBag, GiKetchup, GiFruitBowl } from 'react-icons/gi';
import Breadcrumbs from '@/src/components/Breadcrumbs';
import Loading from '@/src/components/Loading';
import LoadingError from '@/src/components/LoadingError';
import { ThemeContext } from '@/src/context/ThemeContextProvider';
import useFetch from '@/src/hooks/useFetch';
import { type IDataFromDB } from '@/src/types/interfaсes';
import darkStyles from '../../../../styles/pages/shopPage/darkShopPage.module.scss';
import lightStyles from '../../../../styles/pages/shopPage/lightShopPage.module.scss';
import styles from '../../../../styles/pages/shopPage/shopPage.module.scss';

interface IParams {
  shop: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const iconsById: Record<number, JSX.Element> = {
  1: <GiMilkCarton />,
  2: <GiManualJuicer />,
  3: <GiChipsBag />,
  4: <GiKetchup />,
  5: <GiFruitBowl />,
};

export default function ShopPage(): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;
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
        <Breadcrumbs shopResult={shopResult} />
        <div className={`${themeStyles.headerPage} ${styles.headerPage}`}>
          <Image
            className={`${themeStyles.shopImg} ${styles.shopImg}`}
            src={`/img/shops/${shopResult[0].id}.png`}
            width={230}
            height={117}
            alt="shop"
          />
        </div>
        <div className={`${styles.products} ${styles.cards}`}>
          {categoriesResult.map((category: IDataFromDB, index) => (
            <Link
              className={styles.cardLink}
              href={`/portal/shops/${params.shop}/${category.id}`}
              key={category.id}
            >
              <div className={`${themeStyles.card} ${styles.card}`}>
                <div className={styles.categoryIcon}>{iconsById[index + 1]}</div>
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
