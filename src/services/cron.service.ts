import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ScraperService } from './scraper.service';
import { ProductInfo } from '../types/interfaces';

@Injectable()
export class CronService {
  constructor(private readonly scraperService: ScraperService) {}

  @Cron('*/30 * * * * *')
  async handleCron() {
    const productInfo: ProductInfo[] = [
      {
        shop: 'perekrestok',
        url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-ultrapasterilizovannoe-3-2-950ml-2059346',
        element: '.price-new',
      },
      {
        shop: 'spar',
        url: 'https://myspar.ru/catalog/moloko/moloko-domik-v-derevne-2-5-plastikovaya-butylka-1-4l/',
        element: '.prices__cur.js-item-price',
      },
    ];
    await this.scraperService.scrape(productInfo);
  }
}
