'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import Breadcrumbs from '@/src/components/Breadcrumbs';
import ChartsInShops from '@/src/components/ChartsInShops';
import DateInputForm from '@/src/components/DateInputForm';
import Loading from '@/src/components/Loading';
import LoadingError from '@/src/components/LoadingError';
import { ThemeContext } from '@/src/context/ThemeContextProvider';
import useFetch from '@/src/hooks/useFetch';
import getDatesFromLS from '@/src/utils/getDatesFromLS';
import darkStyles from '../../../../../styles/pages/shopPage/darkShopPage.module.scss';
import lightStyles from '../../../../../styles/pages/shopPage/lightShopPage.module.scss';
import styles from '../../../../../styles/pages/shopPage/shopPage.module.scss';

interface IParams {
  shop: string;
  category: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function CategoryPage(): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;
  const params = useParams() as unknown as IParams;
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const datesFromLS = getDatesFromLS();
  const [urls, setUrls] = useState<string[]>([]);
  const [isUrlsSet, setIsUrlsSet] = useState(false);

  const handleUpdateData = (): void => {
    setFetchTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (API_HOST != null && params.shop.length > 0 && params.category.length > 0) {
      const newUrls = [
        `${API_HOST}/shops/filter?shopId=${params.shop}`,
        `${API_HOST}/categories/filter?categoryId=${params.category}`,
      ];
      setUrls(newUrls);
      setIsUrlsSet(true);
    }
  }, [API_HOST, params, fetchTrigger]);

  const { data, isLoading, isError } = useFetch(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = []] = data;

  if (!isUrlsSet || isLoading) {
    return <Loading />;
  }

  if (isError ?? false) return <LoadingError />;

  return (
    <>
      <Breadcrumbs params={params} shopResult={shopResult} categoriesResult={categoriesResult} />
      <div className={styles.productHeader}>
        {shopResult.length > 0 && (
          <Link href={`/portal/shops/${shopResult[0].id}`}>
            <Image
              className={`${styles.shopLinkImg} ${themeStyles.shopLinkImg}`}
              src={`/img/shops/${shopResult[0].id}.png`}
              width={230}
              height={117}
              alt="shop"
            />
          </Link>
        )}
        <div className={styles.dateInputForm}>
          <DateInputForm
            startDateProps={datesFromLS.startDate}
            endDateProps={datesFromLS.endDate}
            onUpdateData={handleUpdateData}
          />
        </div>
      </div>

      <ChartsInShops />
    </>
  );
}
