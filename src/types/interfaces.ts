export interface IDataProduct {
  idProduct: string;
  nameProduct: string;
  dataShop: IDataShop[];
}

export interface IDataShop {
  nameShop: string;
  url: string;
  elementOnPage: string;
}