'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/src/components/Loader';
import { loaderActions } from '@/src/redux/slices/loaderSlice';
import { type IProduct, type IStoreReducer } from '@/src/types/interfaсes';
import styles from '../../../../styles/pages/temp.module.scss';

interface IProps {
  params: {
    id: string;
  };
}

export default function Products({ params: { id } }: IProps): JSX.Element {
  const dispatch = useDispatch();
  const isLoader = useSelector((state: IStoreReducer) => state.loader);

  const [shop, setShop] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:4000/prices-${id}/unique-product-ids`);

      //  'http://localhost:4000/prices-shop-0001/filter?productId=product-0001'

      const result: IProduct[] = await response.json();
      setShop(result[0].shop_name);
      setProducts(result);
      dispatch(loaderActions.setLoader(false));
    } catch (error) {
      console.error('err');
      dispatch(loaderActions.setLoader(false));
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  function shopProductsShopPage(): JSX.Element {
    return (
      <>
        <h1>{shop} store products</h1>
        <div className={styles.products}>
          {products.map((product, index) => (
            <div className={styles.product} key={index}>
              <h2>{product.product_name}</h2>
              <Image src={'/img/charts/chart3.jpg'} width={900} height={250} alt="chart" />
            </div>
          ))}
        </div>
      </>
    );
  }

  return <>{isLoader ? <Loader /> : shopProductsShopPage()}</>;
}
