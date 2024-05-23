'use client';
import { useState, useEffect } from 'react';
import styles from '../../../styles/pages/shops.module.scss';

interface IShop {
  id: string;
  name: string;
}

export default function ShopsPage(): JSX.Element {
  const [shops, setShops] = useState<IShop[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:4000/shops');

      //  'http://localhost:4000/prices-shop-0001/filter?productId=product-0001'

      const result: IShop[] = await response.json();

      setShops(result);
    } catch (error) {
      console.error('err');
    }
  };

  /*   useEffect(() => {
    fetchData();
  }, []); */

  return (
    <>
      <h1>Shopsssss</h1>
      <button className={styles.button}
        onClick={() => {
          void fetchData();
        }}
      >
        Получить вcе магазины
      </button>
      <div className={styles.shops}>
        {shops.map((shop, index) => (
          <div className={styles.shop} key={index}>
            <div>{shop.id}</div>
            <div>{shop.name}</div>
          </div>
        ))}
      </div>
    <div></div>
    </>
  );
}
