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

  //@Cron('25 * * * *')
  @Cron('10 3 * * 1')
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

  @Cron('10 3 * * 2')
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

  @Cron('10 3 * * 3')
  async handleCronCategory0003() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0003',
      dataForScraper: [
        {
          product_id: 'product-0013',
          url: 'https://magnit.ru/product/3174070006-makarony_shebekinskie_spagetti_450g?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0014',
          url: 'https://magnit.ru/product/1342500014-grechka_yadritsa_mistral_900g?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('10 3 * * 4')
  async handleCronCategory0004() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0003',
      dataForScraper: [
        {
          product_id: 'product-0016',
          url: 'https://magnit.ru/product/1000477942-1500065172?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0017',
          url: 'https://magnit.ru/product/1728400015-mayonez_sloboda_olivkovyy_67_400ml?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('10 3 * * 5')
  async handleCronCategory0005() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0003',
      dataForScraper: [
        {
          product_id: 'product-0018',
          url: 'https://magnit.ru/product/9072651501-banany?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0019',
          url: 'https://magnit.ru/product/1444282005-yabloki_golden?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0020',
          url: 'https://magnit.ru/product/1000291140-tomaty_rozovye_azerbaydzhan_1kg?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0021',
          url: 'https://magnit.ru/product/1000382819-tomaty_flamenco_slivovidnye_450g?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
        {
          product_id: 'product-0022',
          url: 'https://magnit.ru/product/3412070013-ogurtsy_sredneplodnye_pupyrchatye?shopCode=992301&shopType=6',
          elementOnPage: 'span[data-v-365ce4a9]',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }
}
