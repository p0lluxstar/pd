import { scraper } from 'src/util/scraper';
import { ProductInfo } from '../types/interfaces';

const productInfo: ProductInfo[] = [
  {
    shop: 'perekrestok',
    url: 'https://www.perekrestok.ru/cat/114/p/moloko-pasterizovannoe-domik-v-derevne-2-5-930ml-3255206',
    element: '.price-new',
  },
];

export const product1 = async () => {
  await scraper(productInfo, 'dataProduct1.txt');
};
