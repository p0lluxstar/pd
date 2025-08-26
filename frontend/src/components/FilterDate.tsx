'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type IStoreReducer } from '../types/interfaсes';
import getDatesFromLS from '../utils/getDatesFromLS';
import DateInputForm from './DateInputForm';

interface IParams {
  shop: string | boolean;
  category: string | boolean;
  product: string | boolean;
}

interface FilterDateProps {
  onUrlsChange?: (urls: string[]) => void;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function FilterDate({ onUrlsChange }: FilterDateProps): JSX.Element {
  const params = useParams() as unknown as IParams;
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);
  const shops = useSelector((state: IStoreReducer) => state.shops) as Record<string, boolean>;
  const datesFromLS = getDatesFromLS();

  useEffect(() => {
    const createUrls = (startDate: string, endDate: string): void => {
      let baseUrls: string[] = [];
      if (params.product as boolean) {
        Object.keys(shops).forEach((key: string) => {
          if (shops[key]) {
            baseUrls.push(
              `${API_HOST}/shops/filter?shopId=${key}`,
              `${API_HOST}/prices-${key}/filter?productId=${params.product}&startDate=${startDate}&endDate=${endDate}`
            );
          }
        });
      }

      if (params.category as boolean) {
        baseUrls = [
          `${API_HOST}/prices-${params.shop}/filter?shopId=${params.shop}&categoryId=${params.category}&startDate=${startDate}&endDate=${endDate}`,
        ];
      }
      setUrls(baseUrls);
    };

    createUrls(datesFromLS.startDate, datesFromLS.endDate);
  }, [fetchTrigger, shops]);

  useEffect(() => {
    if (urls.length > 0) {
      onUrlsChange?.(urls);
    }
  }, [urls, onUrlsChange]);

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
    </>
  );
}
