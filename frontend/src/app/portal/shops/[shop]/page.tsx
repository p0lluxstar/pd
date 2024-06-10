'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Loader from '@/src/components/Loader';
import Title from '@/src/components/Title';
import useFetchData from '@/src/hooks/useFetchData';
import { type IDataFromDB } from '@/src/types/interfaсes';
import styles from '../../../../styles/pages/temp.module.scss';

interface IParams {
  shop: string;
}

export default function ShopPage(): JSX.Element {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const params = useParams() as unknown as IParams;
  const urls = [`${API_HOST}/shops/filter?shopId=${params.shop}`, `${API_HOST}/categories`];
  const { data, isLoader } = useFetchData(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = []] = data;

  function showCategories(): JSX.Element {
    return (
      <>
        <Title shopResult={shopResult} />
        <div className={styles.products}>
          {categoriesResult.map((category: IDataFromDB) => (
            <Link href={`/portal/shops/${params.shop}/${category.id}`} key={category.id}>
              <div>{category.name}</div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return <>{isLoader ? showCategories() : <Loader />}</>;
}
