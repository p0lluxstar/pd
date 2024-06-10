import Link from 'next/link';

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

export default function Title({
  params = { shop: '', category: '', product: '' },
  shopResult = [],
  categoriesResult = [],
  productsResult = [],
}: IProps): JSX.Element {
  function titleOnProductPage(): JSX.Element {
    return (
      <>
        <h1>
          Магазин{' '}
          <Link href={`/portal/shops/${params.shop}`}>
            «{shopResult.length > 0 && shopResult[0].name}»
          </Link>
          , категория{' '}
          <Link href={`/portal/shops/${params.shop}/${params.category}`}>
            «{categoriesResult.length > 0 && categoriesResult[0].name}»
          </Link>
          , продукт «{productsResult.length > 0 && productsResult[0].name}»
        </h1>
      </>
    );
  }

  function titleOnCategoryPage(): JSX.Element {
    return (
      <>
        <h1>
          Магазин{' '}
          <Link href={`/portal/shops/${params.shop}`}>
            «{shopResult.length > 0 && shopResult[0].name}»
          </Link>
          , категория «{categoriesResult.length > 0 && categoriesResult[0].name}»
        </h1>{' '}
      </>
    );
  }

  function titleOnShopPage(): JSX.Element {
    return (
      <>
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
