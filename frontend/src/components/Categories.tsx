'use client';

import Image from 'next/image';
import Link from 'next/link';
import TitleCategoryPages from '@/src/components/TitleCategoryPages';
import styles from '../styles/pages/products.module.scss';

interface IProps {
  categoriesResult: Array<{ id: string; name: string }>;
  productsResult: Array<{ id: string; name: string }>;
}

export default function Categories({ categoriesResult, productsResult }: IProps): JSX.Element {
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
            <div className={styles.card}>
              <Image
                className={styles.cardImg}
                src={`/img/products/${product.id}.jpg`}
                width={150}
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
