import { useQueries } from '@tanstack/react-query';
import { type TFetchData, type IFetchData } from '../types/interfaсes';

const fetchUrl = async (url: string): Promise<TFetchData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useFetch = (urls: string[]): IFetchData => {
  const queryResults = useQueries({
    queries: urls.map((url) => ({
      queryKey: [url],
      queryFn: () => fetchUrl(url),
    })),
  });

  const data = queryResults.every((result) => result.data !== undefined)
    ? queryResults.map((result) => result.data as TFetchData)
    : [];
  const isLoader = queryResults.some((result) => result.isLoading);
  const isError = queryResults.some((result) => result.isError);

  return { data, isLoader };
};

export default useFetch;
