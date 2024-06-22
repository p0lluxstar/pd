export interface IDataFromDB {
  id: string;
  name: string;
  date: string;
  price: number;
  shopName: string;
  category_id: {
    id: string;
    name: string;
  };
}

export interface IStoreReducer {
  loader: boolean;
}

export type TFetchData = IDataFromDB[];

export interface IFetchData {
  data: TFetchData[];
  isLoader: boolean;
}

export interface Dates {
  startDate: string;
  endDate: string;
}

export interface ITransformedDataForChart {
  date: string[];
  prices: number[];
}
