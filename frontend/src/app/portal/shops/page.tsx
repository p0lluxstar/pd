'use client';
import Image from 'next/image';
import Link from 'next/link';
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

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <>
      <h1>Shops</h1>
      {/* <button
        className={styles.button}
        onClick={() => {
          void fetchData();
        }}
      >
        Получить вcе магазины
      </button> */}
      <div className={styles.shops}>
        {shops.map((shop, index) => (
          <Link href={`/portal/shops/${shop.id}`} key={shop.id}>
            <div className={styles.shop} key={index}>
              <Image src={`/img/shops/${shop.id}.jpg`} width={200} height={100} alt="logo" />
              <div className={styles.name}>{shop.name}</div>
            </div>
          </Link>
        ))}
      </div>
      <div></div>
    </>
  );
}
