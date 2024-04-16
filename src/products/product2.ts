import { scraper } from '../util/scraper';
import cron from 'node-cron';
import { ProductInfo } from '../types/interfaces';

const productInfo: ProductInfo[] = [
  {
    shop: 'perekrestok',
    url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-6-950ml-42414',
    element: '.product-price-wrapper .price-new',
  },
  {
    shop: 'magnit',
    url: 'https://magnit.ru/catalog/1812450017/',
    element: '.product-details__price span',
  },
];

export const product2 = () => {
  const scrapeProduct2 = async (): Promise<string | void> => {
    await scraper(productInfo, 'dataProduct2.txt');
  };

  cron.schedule('0 0 */2 * * *', scrapeProduct2);
};
