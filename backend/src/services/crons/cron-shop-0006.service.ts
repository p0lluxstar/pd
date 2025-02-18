import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { ScraperUtilsService } from '../scraper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0006Entity } from 'src/prices/prices-shop-0006/prices-shop-0006.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronShop0006 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0006Entity)
    private readonly prisesShopRepository: Repository<PricesShop0006Entity>
  ) {}

  parsePrice(price: string): number {
    console.log(price);
    return parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.'));
  }

  // @Cron('51 * * * *')
  async handleCron() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0006',
      dataForScraper: [
      ],
    };
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0006Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }
}
