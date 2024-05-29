'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/src/components/Loader';
import { loaderActions } from '@/src/redux/slices/loaderSlice';
import { type IStoreReducer, type IProduct } from '@/src/types/interfaсes';

interface IParams {
  shop: string;
  category: string;
}

interface IResultsData {
  nameShop: string;
  nameCategory: string;
  nameProducts: IProduct[];
}

export default function ProductsPage(): JSX.Element {
  const dispatch = useDispatch();
  const isLoader = useSelector((state: IStoreReducer) => state.loader);
  const params = useParams() as unknown as IParams;
  const [resultsData, setResultsData] = useState<IResultsData>({
    nameShop: '',
    nameCategory: '',
    nameProducts: [],
  });

  const fetchData = async (): Promise<void> => {
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

      setResultsData({
        nameShop: shopResult[0].name,
        nameCategory: categoryResult[0].name,
        nameProducts: productsResult,
      });

      dispatch(loaderActions.setLoader(false));
    } catch (error) {
      console.error('err');
      dispatch(loaderActions.setLoader(false));
    }
  };

  useEffect(() => {
    void fetchData();
  }, [params.shop, params.category]);

  function showProducts(): JSX.Element {
    return (
      <>
        <h1>
          Продукты магазина «{resultsData.nameShop}», категории «{resultsData.nameCategory}»
        </h1>
        <div>
          {resultsData.nameProducts.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      </>
    );
  }

  return <>{isLoader ? <Loader /> : showProducts()}</>;
}
