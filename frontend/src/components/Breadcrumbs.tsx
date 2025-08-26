'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import styles from '../styles/components/breadcrumbs/breadcrumbs.module.scss';
import darkStyles from '../styles/components/breadcrumbs/darkBreadcrumbs.module.scss';
import lightStyles from '../styles/components/breadcrumbs/lightBreadcrumbs.module.scss';

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

export default function Breadcrumbs({
  params = { shop: '', category: '', product: '' },
  shopResult = [],
  categoriesResult = [],
  productsResult = [],
}: IProps): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  function breadcrumbsOnProductPage(): JSX.Element {
    return (
      <>
        <div className={`${styles.breadcrumbs} ${themeStyles.breadcrumbs}`}>
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

  function breadcrumbsOnCategoryPage(): JSX.Element {
    return (
      <>
        <div className={`${styles.breadcrumbs} ${themeStyles.breadcrumbs}`}>
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

  function breadcrumbsOnShopPage(): JSX.Element {
    return (
      <>
        <div className={`${styles.breadcrumbs} ${themeStyles.breadcrumbs}`}>
          <Link href={'/portal/shops/'}>Магазины</Link>
          {' » '}
          <span>{shopResult.length > 0 && shopResult[0].name}</span>
        </div>

        <h1 className={styles.titleShopPages}>
          Категории магазина «{shopResult.length > 0 && shopResult[0].name}»
        </h1>
      </>
    );
  }

  if (productsResult.length > 0) {
    return breadcrumbsOnProductPage();
  } else if (categoriesResult.length > 0) {
    return breadcrumbsOnCategoryPage();
  } else if (shopResult.length > 0) {
    return breadcrumbsOnShopPage();
  } else {
    return <></>;
  }
}
