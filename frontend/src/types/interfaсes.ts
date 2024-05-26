export interface IShop {
  id: string;
  name: string;
}

export interface IProduct {
  product_name: string;
  shop_name: string;
}

export interface IStoreReducer {
  loader: boolean;
}
