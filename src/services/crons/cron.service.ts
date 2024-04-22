import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ScraperService } from '../scraper.service';
import { IDataProduct } from '../../types/interfaces';

@Injectable()
export class CronService {
  constructor(private readonly scraperService: ScraperService) {}

  @Cron('0 1-23/2 * * *')
  async handleCronMilk_000001() {
    const productInfo: IDataProduct = {
      idProduct: 'milk_000001',
      nameProduct: 'moloko-domik-v-derevne-3,2%-0.95l',
      dataShop: [
        {
          nameShop: 'perekrestok',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-ultrapasterilizovannoe-3-2-950ml-2059346',
          elementOnPage: '.price-new',
        },
        {
          nameShop: 'spar',
          url: 'https://myspar.ru/catalog/moloko/moloko-domik-v-derevne-ultrapasterizovan-3-2-korobka-950l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          nameShop: 'magnit',
          url: 'https://magnit.ru/catalog/1812450016/',
          elementOnPage: '.product-details__price span',
        },
      ],
    };
    await this.scraperService.scrape(productInfo);
  }

  @Cron('0 */2 * * *')
  async handleCronMilk_000002() {
    const productInfo: IDataProduct = {
      idProduct: 'milk_000002',
      nameProduct: 'moloko-domik-v-derevne-2,5%-0.95l',
      dataShop: [
        {
          nameShop: 'perekrestok',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-2-5-950ml-3199747',
          elementOnPage: '.price-new',
        },
        {
          nameShop: 'spar',
          url: 'https://myspar.ru/catalog/moloko/moloko-domik-v-derevne-ultrapasterizovan-2-5-tetra-pak-950l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          nameShop: 'magnit',
          url: 'https://magnit.ru/catalog/1812450029/',
          elementOnPage: '.product-details__price span',
        },
      ],
    };
    await this.scraperService.scrape(productInfo);
  }
}
