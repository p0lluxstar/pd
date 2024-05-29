export interface IShop {
  id: string;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  category_id: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IStoreReducer {
  loader: boolean;
}
