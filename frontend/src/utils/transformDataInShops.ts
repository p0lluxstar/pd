interface IProduct {
  id: string;
  name: string;
  prices: number[];
  dates: string[];
}

interface IDataItem {
  product: IProduct;
}

type IDataArray = IDataItem[];

interface IProductFetch {
  id: string;
  name: string;
  price: string;
  date: string;
}

type IDataArrayFetch = IProductFetch[];

export default function transformDataForCategoryInShop(data: IDataArrayFetch): IDataArray {
  const result: IDataArray = [];
  const productMap = new Map();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  data.forEach(({ id, name, price, date }) => {
    if (!productMap.has(id)) {
      productMap.set(id, {
        id,
        name,
        prices: [],
        dates: [],
      });
    }

    const product = productMap.get(id);
    product.prices.push(Number(price));
    product.dates.push(date);
  });

  productMap.forEach((product) => result.push({ product }));

  return result;
}
