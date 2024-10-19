import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0001Entity } from 'src/prices/prices-shop-0001/prices-shop-0001.entity';
import { Repository } from 'typeorm';
import { ScraperUtilsService } from '../scraper.service';

@Injectable()
export class CronShop0001 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0001Entity)
    private readonly prisesShopRepository: Repository<PricesShop0001Entity>
  ) {}

  parsePrice(price: string): number {
    return Number(price.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  //@Cron('0 1-23/2 * * *') //Этот cron выполняется каждый день с 1 часа до 23 часов, через каждые 2 часа (то есть, в 1:00, 3:00, 5:00, и так далее)
  //@Cron('18 * * * *') //на 14-й минуте каждого часа.
  //@Cron('*/16 * * * * *') //Этот cron запускается каждые 16 секунд.
  @Cron('10 3 * * *') // запускается каждый день в 3:10
  async handleCronMilk() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0001',

      dataForScraper: [
        {
          product_id: 'product-0001',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-0-5-950ml-48036',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0002',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-1-5-950ml-2059345',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0003',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-2-5-950ml-3199747',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0004',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-3-5-950ml-21459',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0005',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-6-950ml-42414',
          elementOnPage: '#price-card .price-new',
        },
      ],
    };
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0001Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }
}
