import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ScraperShop0002 } from '../srapers/scraper-shop-0002.service';
import { IDataForCron } from 'src/types/interfaces';

@Injectable()
export class CronShop0002 {
  constructor(private readonly ScraperShop0002: ScraperShop0002) {}

  //@Cron('0 1-23/2 * * *')
  @Cron('15 * * * *')
  async handleCron() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0002',
      dataForScraper: [
        {
          product_id: 'product-0001',
          url: 'https://myspar.ru/catalog/moloko/moloko-domik-v-derevne-ultrapasterizovannoe-0-5-0-95l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0002',
          url: 'https://myspar.ru/catalog/moloko/moloko-domik-v-derevne-ultrapasterizovannoe-1-5-950l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0003',
          url: 'https://myspar.ru/catalog/moloko/moloko-domik-v-derevne-ultrapasterizovan-2-5-tetra-pak-950l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0004',
          url: 'https://myspar.ru/catalog/moloko/moloko-domik-v-derevne-ultrapasterizovan-3-2-korobka-950l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0005',
          url: 'https://myspar.ru/catalog/moloko/moloko-domik-v-derevne-ultrapasterizovannoe-6-950l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
      ],
    };
    await this.ScraperShop0002.scrape(dataForCron);
  }
}
