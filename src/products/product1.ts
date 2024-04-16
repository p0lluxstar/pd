import { scraper } from 'src/util/scraper';
import cron from 'node-cron';
import { ProductInfo } from '../types/interfaces';

const productInfo: ProductInfo[] = [
  {
    shop: 'perekrestok',
    url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-ultrapasterilizovannoe-3-2-950ml-2059346',
    element: '.price-new',
  },
  {
    shop: 'magnit',
    url: 'https://magnit.ru/catalog/1812450016/',
    element: '.product-details__price span',
  },
];

export const product1 = () => {
  const scrapeProduct1 = async (): Promise<string | void> => {
    await scraper(productInfo, 'dataProduct1.txt');
  };

  /*  setInterval(scrapeProduct1, 15000); */
  cron.schedule('0 0 */2 * * *', scrapeProduct1);
};
