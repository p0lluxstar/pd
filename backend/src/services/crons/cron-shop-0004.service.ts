import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { ScraperUtilsService } from '../scraper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0004Entity } from 'src/prices/prices-shop-0004/prices-shop-0004.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronShop0004 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0004Entity)
    private readonly prisesShopRepository: Repository<PricesShop0004Entity>
  ) {}

  parsePrice(price: string): number {
    console.log(price);
    return parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.'));
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('51 * * * *')
  //@Cron('*/20 * * * * *')
  async handleCron() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0004',
      dataForScraper: [
      ],
    };
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0004Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }
}
