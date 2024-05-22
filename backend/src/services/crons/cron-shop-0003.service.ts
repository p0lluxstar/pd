import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { ScraperUtilsService } from '../scraper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0003 } from 'src/prices/prices-shop-0003.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronShop0003 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0003)
    private readonly prisesShopRepository: Repository<PricesShop0003>
  ) {}

  parsePrice(price: string): number {
    return parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.'));
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('*/30 * * * * *')
  //@Cron('35 * * * *')
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
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0003,
      this.prisesShopRepository,
      this.parsePrice
    );
  }
}
