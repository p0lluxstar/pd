'use client';

import Link from 'next/link';
import TitleCategoryPages from '@/src/components/TitleCategoryPages';

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
      <div>
        {productsResult.map((product) => (
          <Link href={`/portal/${categoriesResult[0].id}/${product.id}`} key={product.id}>
            <div>{product.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
