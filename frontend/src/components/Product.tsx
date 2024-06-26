'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import FilterDate from './FilterDate';
import Loader from './Loader';
import ShopsCheckboxForm from './ShopsCheckboxForm';
import TitleCategoryPages from './TitleCategoryPages';

interface IParams {
  category: string;
  product: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function Product(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const createUrls = (): void => {
      const baseUrls = [`${API_HOST}/products/filter?productId=${params.product}`];

      setUrls(baseUrls);
    };

    createUrls();
  }, []);

  const { data, isLoader } = useFetch(urls);

  function showProduct(): JSX.Element {
    return (
      <>
        {data.length > 0 && (
          <TitleCategoryPages
            categoryId={data[0][0].category_id.id}
            categoryName={data[0][0].category_id.name}
            productName={data[0][0].name}
          />
        )}
        <ShopsCheckboxForm />
        <FilterDate />
      </>
    );
  }

  return <>{isLoader ? <Loader /> : showProduct()}</>;
}
