'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/src/components/Loader';
import { loaderActions } from '@/src/redux/slices/loaderSlice';
import { type IStoreReducer } from '@/src/types/interfaсes';

interface IParams {
  shop: string;
  category: string;
}

interface IResultsFetch {
  nameShop: string;
  nameCategory: string;
  dataProducts: [{ product_id: string; name: string }];
}

export default function CategoryPage(): JSX.Element {
  const dispatch = useDispatch();
  const isLoader = useSelector((state: IStoreReducer) => state.loader);
  const params = useParams() as unknown as IParams;
  const [resultsFetch, setResultsFetch] = useState<IResultsFetch>({
    nameShop: '',
    nameCategory: '',
    dataProducts: [{ product_id: '', name: '' }],
  });

  const fetchData = async (): Promise<void> => {
    console.time('fetchData'); // Start timer
    try {
      dispatch(loaderActions.setLoader(true));

      const [shopResponse, categoryResponse, productsResponse] = await Promise.all([
        fetch(`http://localhost:4000/shops/filter?shopId=${params.shop}`),
        fetch(`http://localhost:4000/categories/filter?categoryId=${params.category}`),
        fetch(`http://localhost:4000/prices-${params.shop}/products?categoryId=${params.category}`),
      ]);

      const [shopResult, categoryResult, productsResult] = await Promise.all([
        shopResponse.json(),
        categoryResponse.json(),
        productsResponse.json(),
      ]);

      setResultsFetch({
        nameShop: shopResult[0].name,
        nameCategory: categoryResult[0].name,
        dataProducts: productsResult,
      });

      dispatch(loaderActions.setLoader(false));
    } catch (error) {
      console.error('err');
      dispatch(loaderActions.setLoader(false));
    }
    console.timeEnd('fetchData'); // End timer and log the duration
  };

  useEffect(() => {
    void fetchData();
  }, [params.shop, params.category]);

  function showProducts(): JSX.Element {
    return (
      <>
        <h1>
          Магазин <Link href={`/portal/shops/${params.shop}`}>«{resultsFetch.nameShop}»</Link>, категория «{resultsFetch.nameCategory}»
        </h1>
        <div>
          {resultsFetch.dataProducts.map((product) => (
            <Link href={`/portal/shops/${params.shop}/${params.category}/${product.product_id}`} key={product.product_id}>
              <div>{product.name}</div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return <>{isLoader ? <Loader /> : showProducts()}</>;
}
