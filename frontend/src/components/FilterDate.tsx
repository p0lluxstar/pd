import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { type IStoreReducer, type IDatesFromLS } from '../types/interfaсes';
import getCurrentAndLastDateFormatted from '../utils/getCurrentAndLastDateFormatted';
import Charts from './Charts';
import DateInputForm from './DateInputForm';
import Loading from './Loading';
import LoadingError from './LoadingError';

interface IParams {
  shop: string;
  category: string;
  product: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function FilterDate(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);
  const shops = useSelector((state: IStoreReducer) => state.shops);

  const dates = getCurrentAndLastDateFormatted();
  const getDateFormLS = localStorage.getItem('dateForm');
  const datesFromLS: IDatesFromLS =
    getDateFormLS != null
      ? JSON.parse(getDateFormLS)
      : {
          startDate: dates.startDate,
          endDate: dates.endDate,
        };

  useEffect(() => {
    const createUrls = (startDate: string, endDate: string): void => {
      let baseUrls: string[] = [];
      if (params.shop !== undefined) {
        baseUrls = [
          `${API_HOST}/prices-${params.shop}/filter?productId=${params.product}&startDate=${startDate}&endDate=${endDate}`,
        ];
      } else {
        Object.keys(shops).forEach((key: string) => {
          if (shops[key]) {
            baseUrls.push(
              `${API_HOST}/shops/filter?shopId=${key}`,
              `${API_HOST}/prices-${key}/filter?productId=${params.product}&startDate=${startDate}&endDate=${endDate}`
            );
          }
        });
      }
      setUrls(baseUrls);
    };

    createUrls(datesFromLS.startDate, datesFromLS.endDate);
  }, [fetchTrigger, shops]);

  const { data, isLoading, isError } = useFetch(urls);

  const handleUpdateData = (): void => {
    setFetchTrigger((prev) => prev + 1);
  };

  return (
    <>
      <DateInputForm
        startDateProps={datesFromLS.startDate}
        endDateProps={datesFromLS.endDate}
        onUpdateData={handleUpdateData}
      />
      {isLoading ? (
        <Loading />
      ) : isError ?? false ? (
        <LoadingError />
      ) : (
        <>
          <Charts productData={data} />
        </>
      )}
    </>
  );
}
