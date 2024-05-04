import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0001 } from 'src/prices/prices-shop-0001.entity';
import { Repository } from 'typeorm';
import { ScraperUtilsService } from '../scraper.service';

@Injectable()
export class CronShop0001 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0001)
    private readonly prisesShopRepository: Repository<PricesShop0001>,
  ) {}

  parsePrice(price: string): number {
    return Number(price.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('14 * * * *')
  //@Cron('*/15 * * * * *')
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
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0001,
      this.prisesShopRepository,
      this.parsePrice,
    );
  }
}
