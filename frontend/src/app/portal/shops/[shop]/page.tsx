'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/src/components/Loader';
import { loaderActions } from '@/src/redux/slices/loaderSlice';
import { type IStoreReducer, type ICategory } from '@/src/types/interfaсes';
import styles from '../../../../styles/pages/temp.module.scss';

interface IParams {
  shop: string;
}

interface IResultsData {
  nameShop: string;
  nameCategories: ICategory[];
}

export default function ShopPage(): JSX.Element {
  const dispatch = useDispatch();
  const isLoader = useSelector((state: IStoreReducer) => state.loader);
  const params = useParams() as unknown as IParams;
  const [resultsData, setResultsData] = useState<IResultsData>({
    nameShop: '',
    nameCategories: [],
  });

  const fetchData = async (): Promise<void> => {
    dispatch(loaderActions.setLoader(true));
    try {
      const [shopResponse, categoriesResponse] = await Promise.all([
        fetch(`http://localhost:4000/shops/filter?shopId=${params.shop}`),
        fetch(`http://localhost:4000/prices-${params.shop}/categories`),
      ]);

      const [shopResult, categoriesResult] = await Promise.all([
        shopResponse.json(),
        categoriesResponse.json(),
      ]);

      setResultsData({
        nameShop: shopResult[0].name,
        nameCategories: categoriesResult,
      });

      dispatch(loaderActions.setLoader(false));
    } catch (error) {
      console.error('err');
      dispatch(loaderActions.setLoader(false));
    }
  };

  useEffect(() => {
    void fetchData();
  }, [params.shop]);

  function showCategories(): JSX.Element {
    return (
      <>
        <h1>Категории магазина «{resultsData.nameShop}»</h1>
        <div className={styles.products}>
          {resultsData.nameCategories.map((category) => (
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
