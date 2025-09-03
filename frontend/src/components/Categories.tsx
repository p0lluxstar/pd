'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import TitleCategoryPages from '@/src/components/TitleCategoryPages';
import { ThemeContext } from '../context/ThemeContextProvider';
import styles from '../styles/components/categories/categories.module.scss';
import darkStyles from '../styles/components/categories/darkCategories.module.scss';
import lightStyles from '../styles/components/categories/lightCategories.module.scss';

interface IProps {
  categoriesResult: Array<{ id: string; name: string }>;
  productsResult: Array<{ id: string; name: string }>;
}

export default function Categories({ categoriesResult, productsResult }: IProps): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <>
      {categoriesResult.length > 0 && (
        <TitleCategoryPages categoryName={categoriesResult[0].name} />
      )}
      <div className={styles.cards}>
        {productsResult.map((product) => (
          <Link
            className={styles.cardLink}
            href={`/portal/${categoriesResult[0].id}/${product.id}`}
            key={product.id}
          >
            <div className={`${themeStyles.card} ${styles.card}`}>
              <Image
                className={styles.cardImg}
                src={`/img/products/${product.id}.jpg`}
                width={120}
                height={120}
                alt="shop"
              />
              <div className={styles.cardName}>{product.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
