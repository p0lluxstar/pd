import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loaderActions } from '../redux/slices/loaderSlice';
import { type TFetchData, type IFetchData, type IStoreReducer } from '../types/interfaсes';

const useFetch = (urls: string[]): IFetchData => {
  const dispatch = useDispatch();
  const isLoader = useSelector((state: IStoreReducer) => state.loader);
  const [data, setData] = useState<TFetchData[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const responses = await Promise.all(urls.map(async (url) => await fetch(url)));
        const results = await Promise.all(responses.map(async (response) => await response.json()));

        setData(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        dispatch(loaderActions.setLoader(true));
      }
    };
    void fetchData();
  }, [urls]);

  return { data, isLoader };
};

export default useFetch;
