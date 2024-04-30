import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import puppeteer from 'puppeteer-extra';
import { PricesShop0001 } from 'src/prices/prices-shop-0001.entity';
import { IDataForCron } from 'src/types/interfaces';
import { ScraperUtilsService } from './scraperUtilsService';

@Injectable()
export class ScraperShop0001 {
  constructor(

    private readonly scraperUtilsService: ScraperUtilsService,

    @InjectRepository(PricesShop0001)
    private readonly prisesShopRepository: Repository<PricesShop0001>,
  ) {}

  private parsePrice(priceString: string): number {
    return Number(priceString.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  async scrape(dataForCron: IDataForCron): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    try {
      for (const info of dataForCron.dataForScraper) {

        const price = await this.scraperUtilsService.getPrice(page, info);
        if (price) {
          const shop = await this.scraperUtilsService.getShop(
            dataForCron.shop_id,
          );
          const product = await this.scraperUtilsService.getProduct(
            info.product_id,
          );

          if (!shop || !product) {
            continue;
          }

          const newEntry = new PricesShop0001();
          newEntry.shop_id = shop;
          newEntry.product_id = product;
          newEntry.price = this.parsePrice(price);
          await this.prisesShopRepository.save(newEntry);

          console.log(
            `Shop id: '${dataForCron.shop_id}', product id: '${info.product_id}', successfully written to the database.`,
          );
        }
      }
    } catch (err) {
      console.error('Error when trying to parse a page or save product:', err);
    } finally {
      await browser.close();
    }
  }
}
