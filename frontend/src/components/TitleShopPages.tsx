'use client';

import Link from 'next/link';
import styles from '../styles/components/titleShopPages.module.scss';

interface IEntity {
  id: string;
  name: string;
}

interface IProps {
  params?: {
    shop?: string;
    category?: string;
    product?: string;
  };
  shopResult?: IEntity[];
  categoriesResult?: IEntity[];
  productsResult?: IEntity[];
}

export default function TitleShopPages({
  params = { shop: '', category: '', product: '' },
  shopResult = [],
  categoriesResult = [],
  productsResult = [],
}: IProps): JSX.Element {
  function titleOnProductPage(): JSX.Element {
    return (
      <>
        <div className={styles.breadcrumbs}>
          {' '}
          <Link href={'/portal/shops/'}>Магазины</Link>
          {' » '}
          <Link href={`/portal/shops/${params.shop}`}>
            {shopResult.length > 0 && shopResult[0].name}
          </Link>
          {' » '}
          <Link href={`/portal/shops/${params.shop}/${params.category}`}>
            {categoriesResult.length > 0 && categoriesResult[0].name}
          </Link>
          {' » '}
          <span>{productsResult.length > 0 && productsResult[0].name}</span>
        </div>
        <h1>{productsResult.length > 0 && productsResult[0].name}</h1>
      </>
    );
  }

  function titleOnCategoryPage(): JSX.Element {
    return (
      <>
        <div className={styles.breadcrumbs}>
          {' '}
          <Link href={'/portal/shops/'}>Магазины</Link>
          {' » '}
          <Link href={`/portal/shops/${params.shop}`}>
            {shopResult.length > 0 && shopResult[0].name}
          </Link>
          {' » '}
          <span>{categoriesResult.length > 0 && categoriesResult[0].name}</span>
        </div>
        <h1>Категория «{categoriesResult.length > 0 && categoriesResult[0].name}»</h1>{' '}
      </>
    );
  }

  function titleOnShopPage(): JSX.Element {
    return (
      <>
        <div className={styles.breadcrumbs}>
          <Link href={'/portal/shops/'}>Магазины</Link>
          {' » '}
          <span>{shopResult.length > 0 && shopResult[0].name}</span>
        </div>

        <h1>Категории магазина «{shopResult.length > 0 && shopResult[0].name}»</h1>
      </>
    );
  }

  if (productsResult.length > 0) {
    return titleOnProductPage();
  } else if (categoriesResult.length > 0) {
    return titleOnCategoryPage();
  } else if (shopResult.length > 0) {
    return titleOnShopPage();
  } else {
    return <></>;
  }
}
