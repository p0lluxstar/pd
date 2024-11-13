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
  }

  // Общий метод для обработки данных
  private async handleCronJob(dataForCron: IDataForCron) {
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0002Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('5 * * * *')
  //@Cron('17 * * * *')
  @Cron('0 3 * * 2')
  async handleCronCategory0001() {
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
        {
          product_id: 'product-0011',
          url: 'https://myspar.ru/catalog/smetana/smetana-prostokvashino-15-300g/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0012',
          url: ' https://myspar.ru/catalog/yogurty/bioyogurt-pitevoy-aktibio-naturalnyy-1-8-260g/',
          elementOnPage: '.prices__cur.js-item-price',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('5 3 * * 2')
  async handleCronCategory0002() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0002',
      dataForScraper: [
        {
          product_id: 'product-0006',
          url: 'https://myspar.ru/catalog/voda/voda-mineralnaya-aqua-minerale-negazirovannaya-0-6l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0007',
          url: 'https://myspar.ru/catalog/soki-nektary/nektar-lyubimyy-vishnya-chereshnya-0-95l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0008',
          url: 'https://myspar.ru/catalog/soki-nektary/sok-dobryy-yabloko-1l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0009',
          url: 'https://myspar.ru/catalog/soki-nektary/sok-j7-apelsin-0-97l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0010',
          url: 'https://myspar.ru/catalog/voda/voda-pitevaya-svyatoy-istochnik-negazirovannaya-1-5l/',
          elementOnPage: '.prices__cur.js-item-price',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }
}
