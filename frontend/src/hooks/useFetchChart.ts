import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loaderChartActions } from '../redux/slices/loaderChartSlice';
import { type TFetchChartData, type IFetchDataChart, type IStoreReducer } from '../types/interfaсes';

const useFetch = (urls: string[]): IFetchDataChart => {
  const dispatch = useDispatch();
  const isLoaderChart = useSelector((state: IStoreReducer) => state.loaderChart);
  const [dataChart, setDataChart] = useState<TFetchChartData[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        dispatch(loaderChartActions.setLoaderChart(false));
        const responses = await Promise.all(urls.map(async (url) => await fetch(url)));
        const results = await Promise.all(responses.map(async (response) => await response.json()));

        setDataChart(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        dispatch(loaderChartActions.setLoaderChart(true));
      }
    };
    void fetchData();
  }, [urls]);

  return { dataChart, isLoaderChart };
};

export default useFetch;
