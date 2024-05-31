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
    try {
      dispatch(loaderActions.setLoader(true));

      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

      const [nameShopResponse, nameCategoryResponse, nameProductResponse, pricesProductResponse] =
        await Promise.all([
          fetch(`${API_HOST}/shops/filter?shopId=${params.shop}`),
          fetch(`${API_HOST}/categories/filter?categoryId=${params.category}`),
          fetch(`${API_HOST}/products/filter?productId=${params.product}`),
          fetch(`${API_HOST}/prices-${params.shop}/filter?productId=${params.product}`),
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
  };

  useEffect(() => {
    void fetchData();
  }, [params.product]);

  function showProduct(): JSX.Element {
    return (
      <>
        <h1>
          Магазин <Link href={`/portal/shops/${params.shop}`}>«{resultsFetch[0].nameShop}»</Link>,
          категория{' '}
          <Link href={`/portal/shops/${params.shop}/${params.category}`}>
            «{resultsFetch[0].nameCategory}»
          </Link>
          , продукт «{resultsFetch[0].nameProduct}»
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
