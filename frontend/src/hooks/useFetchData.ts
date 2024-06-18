'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loaderActions } from '../redux/slices/loaderSlice';
import { type IStoreReducer, type TFetchData, type IFetchData } from '../types/interfaсes';

const useFetchData = (urls: string[], fetchTrigger?: number): IFetchData => {
  /* console.log('useFetchData_urls', urls); */
  const dispatch = useDispatch();
  const [data, setData] = useState<TFetchData[]>([]);
  const isLoader = useSelector((state: IStoreReducer) => state.loader);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        dispatch(loaderActions.setLoader(false));
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
  }, [fetchTrigger]);

  /*  console.log('useFetchData_data', data, isLoader); */

  return { data, isLoader };
};

export default useFetchData;
