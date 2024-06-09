export interface IDataFromDB {
  id: string;
  name: string;
  date: string;
  price: number;
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
  currentDate: string;
  lastDate: string;
}

export interface ITransformedDataForChart {
  date: string[];
  prices: number[];
}
