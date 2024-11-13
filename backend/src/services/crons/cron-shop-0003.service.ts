import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { ScraperUtilsService } from '../scraper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0003Entity } from 'src/prices/prices-shop-0003/prices-shop-0003.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronShop0003 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0003Entity)
    private readonly prisesShopRepository: Repository<PricesShop0003Entity>
  ) {}

  parsePrice(price: string): number {
    return parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.'));
  }

  // Общий метод для обработки данных
  private async handleCronJob(dataForCron: IDataForCron) {
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0003Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }

  //@Cron('0 1-23/2 * * *')
  //@Cron('25 * * * *')
  //@Cron('*/20 * * * * *')
  @Cron('0 3 * * 3')
  async handleCronCategory0001() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0003',
      dataForScraper: [
        {
          product_id: 'product-0001',
          url: 'https://magnit.ru/catalog/1812450015/',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0002',
          url: 'https://magnit.ru/catalog/2400025312/',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0003',
          url: 'https://magnit.ru/product/1812450029-moloko_domik_v_derevne_sterizovannoe_2_5_950ml?shopCode=770262&shopType=1',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0004',
          url: 'https://magnit.ru/product/1812450001-moloko_domik_v_derevne_sterizovannoe_3_2_950g?shopCode=243844&shopType=1',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0005',
          url: 'https://magnit.ru/product/1812450017-domik_v_derevne_moloko_ster_6_950g_tba_vbd_12',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0012',
          url: 'https://magnit.ru/promo-product/2052064-aktibio-biojogurt-pit-naturalnyij-18-260g-plbutdanon9?shopCode=992301',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('5 3 * * 3')
  async handleCronCategory0002() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0003',
      dataForScraper: [
        {
          product_id: 'product-0006',
          url: 'https://magnit.ru/product/1000273122-voda_aqua_minerale_pitevaya_negazirovannaya_500ml?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0008',
          url: 'https://magnit.ru/product/2400017290-sok_dobryy_yablochnyy_osvetlennyy_1l?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }
}
