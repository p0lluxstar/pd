'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import styles from '../styles/components/breadcrumbs/breadcrumbs.module.scss';
import darkStyles from '../styles/components/breadcrumbs/darkBreadcrumbs.module.scss';
import lightStyles from '../styles/components/breadcrumbs/lightBreadcrumbs.module.scss';

interface IProps {
  categoryId?: string;
  categoryName?: string;
  productName?: string;
}

export default function TitleCategoryPages({
  categoryId,
  categoryName,
  productName,
}: IProps): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  function titleOnProductPage(): JSX.Element {
    return (
      <>
        <div className={`${styles.breadcrumbs} ${themeStyles.breadcrumbs}`}>
          {' '}
          <Link href={`/portal/${categoryId}`}>{categoryName}</Link>
          {' » '}
          <span>{productName}</span>
        </div>
        <h1>{productName}</h1>
      </>
    );
  }

  function titleOnCategoryPage(): JSX.Element {
    return (
      <>
        <h1>Категория «{categoryName}»</h1>
      </>
    );
  }

  if (productName != null && categoryName != null) {
    return titleOnProductPage();
  } else if (categoryName != null) {
    return titleOnCategoryPage();
  } else {
    return <></>;
  }
}
