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

  //@Cron('17 * * * *')
  @Cron('5 3 * * 1')
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

  @Cron('5 3 * * 3')
  async handleCronCategory0003() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0002',
      dataForScraper: [
        {
          product_id: 'product-0013',
          url: 'https://myspar.ru/catalog/makarony/makaronnye-izdeliya-shebekinskie-spagetti-tonkie-450g/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0014',
          url: 'https://myspar.ru/catalog/krupy/grechka-yadritsa-mistral-900-g/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0015',
          url: 'https://myspar.ru/catalog/krupy/ris-belyy-kruglozernyy-mistral-kuban-900-g/',
          elementOnPage: '.prices__cur.js-item-price',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('5 3 * * 4')
  async handleCronCategory0004() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0002',
      dataForScraper: [
        {
          product_id: 'product-0016',
          url: 'https://myspar.ru/catalog/ketchupy/ketchup-makheev-tomatnyy-doy-pak-300g/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0017',
          url: 'https://myspar.ru/catalog/mayonez-2/mayonez-sloboda-olivkovyy-67-doy-pak-375g/',
          elementOnPage: '.prices__cur.js-item-price',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('5 3 * * 5')
  async handleCronCategory0005() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0002',
      dataForScraper: [
        {
          product_id: 'product-0018',
          url: 'https://myspar.ru/catalog/frukty/banany/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0019',
          url: 'https://myspar.ru/catalog/frukty/yabloki-golden/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0020',
          url: 'https://myspar.ru/catalog/ovoshchi/tomat-rozovyy-azerbaydzhan/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0021',
          url: 'https://myspar.ru/catalog/ovoshchi/tomaty-slivovidnye-flamenco-450g/',
          elementOnPage: '.prices__cur.js-item-price',
        },
        {
          product_id: 'product-0022',
          url: 'https://myspar.ru/catalog/ovoshchi/ogurtsy-teplichnye-sredneplodnye/',
          elementOnPage: '.prices__cur.js-item-price',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }
}
