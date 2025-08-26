import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IDataForCron } from 'src/types/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0001Entity } from 'src/prices/prices-shop-0001/prices-shop-0001.entity';
import { Repository } from 'typeorm';
import { ScraperUtilsService } from '../scraper.service';

@Injectable()
export class CronShop0001 {
  constructor(
    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0001Entity)
    private readonly prisesShopRepository: Repository<PricesShop0001Entity>
  ) {}

  parsePrice(price: string): number {
    return Number(price.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  private async handleCronJob(dataForCron: IDataForCron) {
    await this.scraperUtilsService.scrape(
      dataForCron,
      PricesShop0001Entity,
      this.prisesShopRepository,
      this.parsePrice
    );
  }

  //@Cron('0 1-23/2 * * *') //Этот cron выполняется каждый день с 1 часа до 23 часов, через каждые 2 часа (то есть, в 1:00, 3:00, 5:00, и так далее)
  //@Cron('13 * * * *') //на 14-й минуте каждого часа.
  //@Cron('*/59 * * * * *') //Этот cron запускается каждые 59 секунд.
  // @Cron('50 3 * * *') // запускается каждый день в 3:50
  //@Cron('0 3 * * 1') // запускается в понедельник в 3:00
  async handleCronCategory0001() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0001',
      dataForScraper: [
        {
          product_id: 'product-0001',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-0-5-950ml-48036',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0002',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-1-5-950ml-2059345',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0003',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-2-5-950ml-3199747',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0004',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-3-5-950ml-21459',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0005',
          url: 'https://www.perekrestok.ru/cat/114/p/moloko-domik-v-derevne-sterilizovannoe-6-950ml-42414',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0011',
          url: 'https://www.perekrestok.ru/cat/118/p/smetana-prostokvasino-15-300g-4121592',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0012',
          url: 'https://www.perekrestok.ru/cat/119/p/biojogurt-aktibio-obogasennyj-bifidobakteriami-1-8-260ml-4298986',
          elementOnPage: '#price-card .price-new',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('0 3 * * 2')
  async handleCronCategory0002() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0001',

      dataForScraper: [
        {
          product_id: 'product-0006',
          url: 'https://www.perekrestok.ru/cat/208/p/voda-aqua-minerale-pitevaa-negazirovannaa-500ml-3922562',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0007',
          url: 'https://www.perekrestok.ru/cat/740/p/napitok-sokosoderzasij-lubimyj-visnevaa-ceresna-950ml-3456934',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0008',
          url: 'https://www.perekrestok.ru/cat/211/p/sok-dobryj-abloko-1l-58049',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0009',
          url: 'https://www.perekrestok.ru/cat/211/p/sok-j7-apelsinovyj-s-makotu-970ml-3190682',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0010',
          url: 'https://www.perekrestok.ru/cat/208/p/voda-svatoj-istocnik-klucevaa-pitevaa-negazirovannaa-1-5l-1913',
          elementOnPage: '#price-card .price-new',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('0 3 * * 3')
  async handleCronCategory0003() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0001',
      dataForScraper: [
        {
          product_id: 'product-0013',
          url: 'https://www.perekrestok.ru/cat/105/p/spagetti-sebekinskie-no2-tonkie-450g-82760',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0014',
          url: 'https://www.perekrestok.ru/cat/107/p/grecka-mistral-900g-53673',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0015',
          url: 'https://www.perekrestok.ru/cat/107/p/ris-mistral-kuban-belyj-kruglozernyj-900g-3766',
          elementOnPage: '#price-card .price-new',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('0 3 * * 4')
  async handleCronCategory0004() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0001',
      dataForScraper: [
        {
          product_id: 'product-0016',
          url: 'https://www.perekrestok.ru/cat/219/p/ketcup-maheev-tomatnyj-300g-4044938',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0017',
          url: 'https://www.perekrestok.ru/cat/221/p/majonez-sloboda-olivkovyj-67-400g-2108609',
          elementOnPage: '#price-card .price-new',
        },

      ],
    };
    await this.handleCronJob(dataForCron);
  }

  @Cron('0 3 * * 5')
  async handleCronCategory0005() {
    const dataForCron: IDataForCron = {
      shop_id: 'shop-0001',
      dataForScraper: [
        {
          product_id: 'product-0018',
          url: 'https://www.perekrestok.ru/cat/153/p/banany-3757',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0019',
          url: 'https://www.perekrestok.ru/cat/153/p/abloki-golden-market-perekrestok-3366324',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0020',
          url: 'https://www.perekrestok.ru/cat/150/p/tomaty-rozovye-azerbajdzan-3695580',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0021',
          url: 'https://www.perekrestok.ru/cat/150/p/tomaty-flamenco-slivovidnye-krasnye-450g-4217380',
          elementOnPage: '#price-card .price-new',
        },
        {
          product_id: 'product-0022',
          url: 'https://www.perekrestok.ru/cat/150/p/ogurcy-kolucie-sredneplodnye-3255111',
          elementOnPage: '#price-card .price-new',
        },
      ],
    };
    await this.handleCronJob(dataForCron);
  }
}
