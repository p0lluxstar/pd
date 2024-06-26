'use client';

import Link from 'next/link';

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
  function titleOnProductPage(): JSX.Element {
    return (
      <>
        <h1>
          Категория <Link href={`/portal/${categoryId}`}>«{categoryName}»</Link>, продукт «
          {productName}»
        </h1>
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
