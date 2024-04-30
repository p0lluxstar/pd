import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ScraperShop0001 } from '../srapers/scraper-shop-0001.service';
import { IDataForCron } from 'src/types/interfaces';

@Injectable()
export class CronShop0001 {
  constructor(private readonly ScraperShop0001: ScraperShop0001) {}

  //@Cron('0 1-23/2 * * *')
  //@Cron('14 * * * *')
  @Cron('*/30 * * * * *')
  async handleCronMilk() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0001',
      dataForScraper: [
        {
          product_id: 'product-0001',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-0-5-950ml-48036',
          elementOnPage: '.price-new',
        },
        {
          product_id: 'product-0002',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-1-5-950ml-2059345',
          elementOnPage: '.price-new',
        },
        {
          product_id: 'product-0003',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-2-5-950ml-3199747',
          elementOnPage: '.price-new',
        },
        {
          product_id: 'product-0004',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-3-5-950ml-21459',
          elementOnPage: '.price-new',
        },
        {
          product_id: 'product-0005',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-6-950ml-42414',
          elementOnPage: '.price-new',
        },
      ],
    };
    await this.ScraperShop0001.scrape(dataForCron);
  }
}
