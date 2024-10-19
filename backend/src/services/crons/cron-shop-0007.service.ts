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
    console.log(price);
    // Убираем все нецифровые символы
    const cleanedPrice = price.replace(/[^\d]/g, '');

    // Преобразуем строку в нужный формат с копейками
    const formattedPrice = cleanedPrice.slice(0, -2) + '.' + cleanedPrice.slice(-2);

    // Преобразуем в число
    return parseFloat(formattedPrice.replace(',', '.'));
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('38 * * * *')
  //@Cron('*/20 * * * * *')
  @Cron('50 3 * * *')
  async handleCron() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0007',
      dataForScraper: [
        {
          product_id: 'product-0001',
          url: 'https://asdfmagnit.ru/catalog/1812450015/',
          elementOnPage: '.product-details__price span',
        },
        {
          product_id: 'product-0002',
          url: 'https://asdflenta.com/',
          elementOnPage: '.fullPricePDP',
        },
        {
          product_id: 'product-0003',
          url: 'https://online.globus.ru/products/moloko-ultrapasterizovannoe-domik-v-derevne-25-925-ml-117719_ST',
          elementOnPage: 'div[itemprop="price"]',
        },

        {
          product_id: 'product-0004',
          url: 'https://5ka.ru/product/2059346/moloko-domik-v-derevne--bzmzh-g/',
          elementOnPage: '.j_IdgaDq-111',
        },
        {
          product_id: 'product-0005',
          url: 'https://asdfmagnit.ru/catalog/1812450017/',
          elementOnPage: '.pj_IdgaDq-',
        },
      ],
    };
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0007Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }
}
