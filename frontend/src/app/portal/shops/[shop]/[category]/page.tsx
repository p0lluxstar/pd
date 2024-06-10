'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Loader from '@/src/components/Loader';
import Title from '@/src/components/Title';
import useFetchData from '@/src/hooks/useFetchData';
import { type IDataFromDB } from '@/src/types/interfaсes';

interface IParams {
  shop: string;
  category: string;
}

export default function CategoryPage(): JSX.Element {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const params = useParams() as unknown as IParams;
  const urls = [
    `${API_HOST}/shops/filter?shopId=${params.shop}`,
    `${API_HOST}/categories/filter?categoryId=${params.category}`,
    `${API_HOST}/prices-${params.shop}/products?categoryId=${params.category}`,
  ];
  const { data, isLoader } = useFetchData(urls);

  // Добавляем проверки наличия данных перед их использованием
  const [shopResult = [], categoriesResult = [], productsResult = []] = data;

  function showProducts(): JSX.Element {
    return (
      <>
        <Title
          params={params}
          shopResult={shopResult}
          categoriesResult={categoriesResult}
        />
        <div>
          {productsResult.map((product: IDataFromDB) => (
            <Link
              href={`/portal/shops/${params.shop}/${params.category}/${product.id}`}
              key={product.id}
            >
              <div>{product.name}</div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return <>{isLoader ? showProducts() : <Loader />}</>;
}
