import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { ScraperUtilsService } from '../scraper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0005Entity } from 'src/prices/prices-shop-0005/prices-shop-0005.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronShop0005 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0005Entity)
    private readonly prisesShopRepository: Repository<PricesShop0005Entity>
  ) {}

  parsePrice(price: string): number {
    // Убираем все нецифровые символы
    const cleanedPrice = price.replace(/[^\d]/g, '');

    // Преобразуем строку в нужный формат с копейками
    const formattedPrice = cleanedPrice.slice(0, -2) + ',' + cleanedPrice.slice(-2);

    // Преобразуем в число
    return parseFloat(formattedPrice.replace(',', '.'));
  }

  // Общий метод для обработки данных
  private async handleCronJob(dataForCron: IDataForCron) {
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0005Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('26 * * * *')
  //@Cron('*/20 * * * * *')
  //@Cron('41 * * * *')
  @Cron('20 3 * * 1')
  async handleCronCategory0001() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0005',
      dataForScraper: [
        /*  {
          product_id: 'product-0002',
          url: 'https://online.globus.ru/products/moloko-ultrapasterizovannoe-domik-v-derevne-15-924-ml-5423_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] div[itemprop="price"]',
        }, */
        {
          product_id: 'product-0003',
          url: 'https://online.globus.ru/products/moloko-ultrapasterizovannoe-domik-v-derevne-25-925-ml-117719_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0004',
          url: 'https://online.globus.ru/products/moloko-ultrapasterizovannoe-domik-v-derevne-32-925-ml-102929_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0005',
          url: 'https://online.globus.ru/products/moloko-ultrapasterizovannoe-domik-v-derevne-6-928-ml-179517_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0011',
          url: 'https://online.globus.ru/products/smetana-prostokvashino-15-300-g-629411_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-ou7p07',
        },
        {
          product_id: 'product-0012',
          url: 'https://online.globus.ru/products/biojogurt-pitevoj-naturalnyj-aktibio-18-260-g-762173_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('20 3 * * 2')
  async handleCronCategory0002() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0005',
      dataForScraper: [
        {
          product_id: 'product-0006',
          url: 'https://online.globus.ru/products/voda-pitevaya-aqua-minerale-negazirovannaya-05-l-515050_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0007',
          url: 'https://online.globus.ru/products/napitok-sokosoderzhashhij-lyubimyj-vishnyovaya-chereshnya-095-l-327334_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0008',
          url: 'https://online.globus.ru/products/sok-dobryj-yabloko-1-l-19882_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0009',
          url: '        https://online.globus.ru/products/sok-j7-apelsin-s-myakotyu-097-l-140172_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0010',
          url: ' https://online.globus.ru/products/voda-pitevaya-svyatoj-istochnik-negazirovannaya-15-l-6017_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('20 3 * * 3')
  async handleCronCategory0003() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0005',
      dataForScraper: [
        {
          product_id: 'product-0013',
          url: 'https://online.globus.ru/products/makaronnye-izdeliya-shebekinskie-spagetti-tonkie-450-g-22055_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0014',
          url: 'https://online.globus.ru/products/krupa-grechnevaya-mistral-yadricza-900-g-22205_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0015',
          url: 'https://online.globus.ru/products/ris-kruglozyornyj-mistral-kuban-belyj-900-g-22204_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1ebnygn',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('20 3 * * 4')
  async handleCronCategory0004() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0005',
      dataForScraper: [
        {
          product_id: 'product-0016',
          url: 'https://online.globus.ru/products/ketchup-tomatnyj-maxeev-300-g-511795_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0017',
          url: 'https://online.globus.ru/products/majonez-olivkovyj-sloboda-67-400-ml-86215_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1ebnygn',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('20 3 * * 5')
  async handleCronCategory0005() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0005',
      dataForScraper: [
        /* {
          product_id: 'product-0018',
          url: 'https://online.globus.ru/products/banan-1-shtuka-120-280-g-15_KG',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        }, */
        {
          product_id: 'product-0019',
          url: 'https://online.globus.ru/products/yabloki-golden-delishes-1-kg-78_KG',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0021',
          url: 'https://online.globus.ru/products/pomidory-slivovidnye-krasnye-rost-flamenco-450-g-599685_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }
}
