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
  product: string;
}

interface IResultsFetch {
  nameShop: string;
  nameCategory: string;
  nameProduct: string;
  pricesProduct: [
    {
      id: 0;
      date: string;
      price: number;
    },
  ];
}

export default function ProductPage(): JSX.Element {
  const dispatch = useDispatch();
  const isLoader = useSelector((state: IStoreReducer) => state.loader);
  const params = useParams() as unknown as IParams;
  const [resultsFetch, setResultsFetch] = useState<IResultsFetch[]>([
    {
      nameShop: '',
      nameCategory: '',
      nameProduct: '',
      pricesProduct: [
        {
          id: 0,
          date: '',
          price: 0,
        },
      ],
    },
  ]);

  const fetchData = async (): Promise<void> => {
    console.time('fetchData'); // Start timer
    try {
      dispatch(loaderActions.setLoader(true));

      const [nameShopResponse, nameCategoryResponse, nameProductResponse, pricesProductResponse] =
        await Promise.all([
          fetch(`http://localhost:4000/shops/filter?shopId=${params.shop}`),
          fetch(`http://localhost:4000/categories/filter?categoryId=${params.category}`),
          fetch(`http://localhost:4000/products/filter?productId=${params.product}`),
          fetch(`http://localhost:4000/prices-${params.shop}/filter?productId=${params.product}`),
        ]);

      const [nameShopResult, nameCategoryResult, nameProductResult, pricesProducResult] =
        await Promise.all([
          nameShopResponse.json(),
          nameCategoryResponse.json(),
          nameProductResponse.json(),
          pricesProductResponse.json(),
        ]);

      setResultsFetch([
        {
          nameShop: nameShopResult[0].name,
          nameCategory: nameCategoryResult[0].name,
          nameProduct: nameProductResult[0].name,
          pricesProduct: pricesProducResult,
        },
      ]);

      dispatch(loaderActions.setLoader(false));
    } catch (error) {
      console.error('err');
      dispatch(loaderActions.setLoader(false));
    }
    console.timeEnd('fetchData'); // End timer and log the duration
  };

  useEffect(() => {
    void fetchData();
  }, [params.product]);

  function showProduct(): JSX.Element {
    console.log('resultsFetch', resultsFetch);
    return (
      <>
        <h1>
          Магазин <Link href={`/portal/shops/${params.shop}`}>«{resultsFetch[0].nameShop}»</Link>, категория <Link href={`/portal/shops/${params.shop}/${params.category}`}>«{resultsFetch[0].nameCategory}»</Link>, продукт «
          {resultsFetch[0].nameProduct}»
        </h1>
        <div>
          {resultsFetch[0].pricesProduct.map((price) => (
            <div key={price.id}>
              {price.date} - {price.price}
            </div>
          ))}
        </div>
      </>
    );
  }

  return <>{isLoader ? <Loader /> : showProduct()}</>;
}
