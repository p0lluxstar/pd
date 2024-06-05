export interface IData {
  id: string;
  name: string;
  date: string;
  price: number;
}

export interface IStoreReducer {
  loader: boolean;
}

export type TFetchData = IData[];

export interface IFetchData {
  data: TFetchData[];
  isLoader: boolean;
}
