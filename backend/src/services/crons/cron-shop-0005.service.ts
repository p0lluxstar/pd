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
    console.log(price);
    return parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.'));
  }

  //@Cron('0 1-23/2 * * *')
  // @Cron('51 * * * *')
 //@Cron('*/20 * * * * *')
  async handleCron() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0005',
      dataForScraper: [
        /*       {
          product_id: 'product-0001',
          url: 'https://magnit.ru/catalog/1812450015/',
          elementOnPage: '.product-details__price span',
        },
        {
          product_id: 'product-0002',
          url: 'https://lenta.com/',
          elementOnPage: '.fullPricePDP',
        }, */
        {
          product_id: 'product-0003',
          url: 'https://online.globus.ru/products/moloko-ultrapasterizovannoe-domik-v-derevne-25-925-ml-117719_ST',
          elementOnPage: 'div[itemprop="price"]',
        },
        /*{
          product_id: 'product-0004',
          url: 'https://magnit.ru/product/1812450001-1',
          elementOnPage: 'span[data-v-db612f9b]',
        },
        /* {
          product_id: 'product-0005',
          url: 'https://magnit.ru/catalog/1812450017/',
          elementOnPage: '.product-details__price span',
        }, */
      ],
    };
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0005Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }
}
