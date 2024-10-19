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
    // Убираем все нецифровые символы
    const cleanedPrice = price.replace(/[^\d]/g, '');

    // Преобразуем строку в нужный формат с копейками
    const formattedPrice = cleanedPrice.slice(0, -2) + ',' + cleanedPrice.slice(-2);

    // Преобразуем в число
    return parseFloat(formattedPrice.replace(',', '.'));
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('26 * * * *')
  //@Cron('*/20 * * * * *')
  @Cron('40 3 * * *')
  async handleCron() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0005',
      dataForScraper: [
        {
          product_id: 'product-0001',
          url: 'https://asdfmagnit.ru/catalog/1812450015/',
          elementOnPage: '.product-details__price span',
        },

        {
          product_id: 'product-0002',
          url: 'https://online.globus.ru/products/moloko-ultrapasterizovannoe-domik-v-derevne-15-924-ml-5423_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] div[itemprop="price"]',
        },
        {
          product_id: 'product-0003',
          url: 'https://online.globus.ru/products/moloko-ultrapasterizovannoe-domik-v-derevne-25-925-ml-117719_ST',
          elementOnPage: 'div[itemtype="http://schema.org/Product"] .css-1t0dwxn',
        },
        {
          product_id: 'product-0004',
          url: 'https://asdfmagnit.ru/product/1812450001-1',
          elementOnPage: 'span[data-v-db612f9b]',
        },
        {
          product_id: 'product-0005',
          url: 'https://asdfmagnit.ru/catalog/1812450017/',
          elementOnPage: '.product-details__price span',
        },
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
