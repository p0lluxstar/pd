import Image from 'next/image';
import { useParams } from 'next/navigation';
import useFetch from '../hooks/useFetch';
import styles from '../styles/components/chartsInShops.module.scss';
import getDatesFromLS from '../utils/getDatesFromLS';
import transformDataInShops from '../utils/transformDataInShops';
import ChartLine from './ChartLine';
import Loading from './Loading';
import LoadingError from './LoadingError';
import PriceChange from './PriceChange';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

interface IParams {
  shop: string;
  category: string;
}

export default function ChartsInShops(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const datesFromLS = getDatesFromLS();

  const { data, isLoading, isError } = useFetch([
    `${API_HOST}/prices-${params.shop}/filter?shopId=${params.shop}&categoryId=${params.category}&startDate=${datesFromLS.startDate}&endDate=${datesFromLS.endDate}`,
  ]);
  const [productsData = []] = data;
  const dataForCategory = transformDataInShops(productsData);

  return isLoading ? (
    <Loading />
  ) : isError ?? false ? (
    <LoadingError />
  ) : dataForCategory.length > 0 ? (
    <div className={styles.charts}>
      {dataForCategory.map((el, index) => (
        <div className={styles.chart} key={index}>
          <div className={styles.chartTitleWrapper}>
            <h2 className={styles.chartTitle}>{el.product.name}</h2>
            <Image
              className={styles.cardImg}
              src={`/img/products/${el.product.id}.jpg`}
              width={80}
              height={40}
              alt="shop"
            />
          </div>
          <PriceChange data={el.product.prices} />
          <ChartLine date={el.product.dates} price={el.product.prices} />
        </div>
      ))}
    </div>
  ) : (
    <div>Нет данных</div>
  );
}
