import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import useFetch from '../hooks/useFetch';
import styles from '../styles/components/chartInShops/chartsInShops.module.scss';
import darkStyles from '../styles/components/chartInShops/darkChartsInShops.module.scss';
import lightStyles from '../styles/components/chartInShops/lightChartsInShops.module.scss';
import getDatesFromLS from '../utils/getDatesFromLS';
import transformDataInShops from '../utils/transformDataInShops';
import ChartLine from './ChartLine';
import ImagePreview from './ImagePreview';
import Loading from './Loading';
import LoadingError from './LoadingError';
import PriceChange from './PriceChange';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

interface IParams {
  shop: string;
  category: string;
}

export default function ChartsInShops(): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;
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
        <div className={`${themeStyles.chart} ${styles.chart}`} key={index}>
          <div className={styles.chartTitleWrapper}>
            <h2 className={styles.chartTitle}>
              <Link href={`/portal/${params.category}/${el.product.id}`}>«{el.product.name}»</Link>
            </h2>
            <ImagePreview url={`/img/products/${el.product.id}.jpg`} width={60} height={54} />
          </div>
          <PriceChange data={el.product.prices} />
          <ChartLine date={el.product.dates} price={el.product.prices} />
        </div>
      ))}
    </div>
  ) : (
    <div className={`${themeStyles.noData} ${styles.noData}`}>Нет данных</div>
  );
}
