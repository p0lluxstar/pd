import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { ScraperUtilsService } from '../scraper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0007Entity } from 'src/prices/prices-shop-0007/prices-shop-0007.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronShop0007 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0007Entity)
    private readonly prisesShopRepository: Repository<PricesShop0007Entity>
  ) {}

  parsePrice(price: string): number {
    // Убираем все нецифровые символы
    const cleanedPrice = price.replace(/[^\d]/g, '');

    // Преобразуем строку в нужный формат с копейками
    const formattedPrice = cleanedPrice.slice(0, -2) + '.' + cleanedPrice.slice(-2);

    // Преобразуем в число
    return parseFloat(formattedPrice.replace(',', '.'));
  }

  // Общий метод для обработки данных
  private async handleCronJob(dataForCron: IDataForCron) {
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0007Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('7 * * * *')
  //@Cron('*/20 * * * * *')
  @Cron('30 3 * * 1')
  async handleCronCategory0001() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0007',
      dataForScraper: [
        {
          product_id: 'product-0003',
          url: 'https://5ka.ru/product/3199747/moloko-domik-v-derevne--bzmzh-g/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0012',
          url: 'https://5ka.ru/product/4298986/yogurt-pitevoy-aktibio--g/',
          elementOnPage: '.j_IdgaDq-',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('30 3 * * 2')
  async handleCronCategory0002() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0007',
      dataForScraper: [
        {
          product_id: 'product-0006',
          url: 'https://5ka.ru/product/3922562/voda--yeye-negazirovannaya-l/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0007',
          url: 'https://5ka.ru/product/3456934/napitok-sokosoderzhashchiy-lyubimyy-vishnevaya-che/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0008',
          url: 'https://5ka.ru/product/58049/sok-dobryy-yabloko-l/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0009',
          url: 'https://5ka.ru/product/3190682/sok--apelsinovyy-s-myakotyu-l/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0010',
          url: 'https://5ka.ru/product/1913/voda-svyatoy-istochnik-negazirovannaya-l/',
          elementOnPage: '.j_IdgaDq-',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('30 3 * * 3')
  async handleCronCategory0003() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0007',
      dataForScraper: [
        {
          product_id: 'product-0013',
          url: 'https://5ka.ru/product/82760/spagetti-shebekinskie--tonkie-g/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0014',
          url: 'https://5ka.ru/product/53673/grechka-mistral-g/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0015',
          url: 'https://5ka.ru/product/3766/ris-mistral-kuban-belyy-kruglozyornyy-g/',
          elementOnPage: '.j_IdgaDq-',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('30 3 * * 4')
  async handleCronCategory0004() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0007',
      dataForScraper: [
        {
          product_id: 'product-0016',
          url: 'https://5ka.ru/product/4044938/ketchup-makheev-tomatnyy-g/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0017',
          url: 'https://5ka.ru/product/2108609/mayonez-sloboda-olivkovyy--ml/',
          elementOnPage: '.j_IdgaDq-',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('30 3 * * 5')
  async handleCronCategory0005() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0007',
      dataForScraper: [
        {
          product_id: 'product-0018',
          url: 'https://5ka.ru/product/3021692/banany-krasnaya-tsena-fasovannye/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0019',
          url: 'https://5ka.ru/product/48188/yabloki-golden/',
          elementOnPage: '.j_IdgaDq-',
        },
        {
          product_id: 'product-0021',
          url: 'https://5ka.ru/product/4217380/tomaty-flamenko-slivovidnye-krasnye-g/',
          elementOnPage: '.j_IdgaDq-',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }
}
