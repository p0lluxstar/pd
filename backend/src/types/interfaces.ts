export interface IDataForCron {
  shop_id: string;
  dataForScraper: IDataForScraper[];
}

export interface IDataForScraper {
  product_id: string;
  url: string;
  elementOnPage: string;
}
