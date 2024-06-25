import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { type IStoreReducer, type IDatesFromLS } from '../types/interfaсes';
import getCurrentAndLastDateFormatted from '../utils/getCurrentAndLastDateFormatted';
import Charts from './Charts';
import DateInputForm from './DateInputForm';
import Loader from './Loader';

interface IParams {
  shop: string;
  category: string;
  product: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function FilterDate(): JSX.Element {
  const params = useParams() as unknown as IParams;
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [urlsChart, setUrlsChart] = useState<string[]>([]);
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
      let baseUrlsChart: string[] = [];
      if (params.shop !== undefined) {
        baseUrlsChart = [
          `${API_HOST}/prices-${params.shop}/filter?productId=${params.product}&startDate=${startDate}&endDate=${endDate}`,
        ];
      } else {
        Object.keys(shops).forEach((key: string) => {
          console.log(key);
          if (shops[key]) {
            baseUrlsChart.push(
              `${API_HOST}/prices-${key}/filter?productId=${params.product}&startDate=${startDate}&endDate=${endDate}`
            );
          }
        });
      }
      setUrlsChart(baseUrlsChart);
    };

    createUrls(datesFromLS.startDate, datesFromLS.endDate);
  }, [fetchTrigger, shops]);

  const { data, isLoader } = useFetch(urlsChart);

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
      {isLoader ? <Loader /> : <Charts data={data} isShop={params.shop} />}
    </>
  );
}
