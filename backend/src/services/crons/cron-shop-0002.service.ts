import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { ScraperUtilsService } from '../scraper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0002Entity } from 'src/prices/prices-shop-0002/prices-shop-0002.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronShop0002 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0002Entity)
    private readonly prisesShopRepository: Repository<PricesShop0002Entity>
  ) {}

  parsePrice(price: string): number {
    return Number(parseFloat(price.replace(/[^\d.]/g, '')).toFixed(2));
    /*   const priceAsString = price.replace(/[^\d,]/g, '');
    return parseFloat(
      priceAsString.slice(0, -2) + '.' + priceAsString.slice(-2),
    ); */
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('*/15 * * * * *')
  //@Cron('17 * * * *')
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
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0002Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }
}
