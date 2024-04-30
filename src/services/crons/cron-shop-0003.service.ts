import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ScraperShop0003 } from '../srapers/scraper-shop-0003.service';
import { IDataForCron } from 'src/types/interfaces';

@Injectable()
export class CronShop0003 {
  constructor(private readonly ScraperShop0003: ScraperShop0003) {}

  //@Cron('0 1-23/2 * * *')
  @Cron('16 * * * *')
  async handleCron() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0003',
      dataForScraper: [
        {
          product_id: 'product-0001',
          url: 'https://magnit.ru/catalog/1812450015/',
          elementOnPage: '.product-details__price span',
        },
        {
          product_id: 'product-0002',
          url: 'https://magnit.ru/catalog/2400025312/',
          elementOnPage: '.product-details__price span',
        },
        {
          product_id: 'product-0003',
          url: 'https://magnit.ru/catalog/1812450029/',
          elementOnPage: '.product-details__price span',
        },
        {
          product_id: 'product-0004',
          url: 'https://magnit.ru/catalog/1812450016/',
          elementOnPage: '.product-details__price span',
        },
        {
          product_id: 'product-0005',
          url: 'https://magnit.ru/catalog/1812450017/',
          elementOnPage: '.product-details__price span',
        },
      ],
    };
    await this.ScraperShop0003.scrape(dataForCron);
  }
}
