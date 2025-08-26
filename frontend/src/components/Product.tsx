'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import styles from '../styles/components/product.module.scss';
import ChartsInCategories from './ChartsInCategories';
import FilterDate from './FilterDate';
import ImagePreview from './ImagePreview';
import Loading from './Loading';
import LoadingError from './LoadingError';
import ShopsCheckboxForm from './ShopsCheckboxForm';
import TitleCategoryPages from './TitleCategoryPages';

interface IParams {
  category: string;
  product: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function Product(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const [filteredUrls, setFilteredUrls] = useState<string[]>([]);

  const urls = useMemo(
    () => [`${API_HOST}/products/filter?productId=${params.product}`],
    [API_HOST, params]
  );

  const { data, isLoading, isError } = useFetch(urls);

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
        <div className={styles.productHeader}>
          <div>
            <ImagePreview url={`/img/products/${params.product}.jpg`} width={300} height={255} />
          </div>
          <div className={styles.productFilters}>
            <ShopsCheckboxForm />
            <FilterDate
              onUrlsChange={(urls) => {
                setFilteredUrls(urls);
              }}
            />
          </div>
        </div>
        <div>
          <ChartsInCategories urls={filteredUrls} />
        </div>
      </>
    );
  }

  return isLoading ? <Loading /> : isError ?? false ? <LoadingError /> : <>{showProduct()}</>;
}
