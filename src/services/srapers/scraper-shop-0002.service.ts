import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import puppeteer from 'puppeteer-extra';
import { PricesShop0002 } from '../../prices/prices-shop-0002.entity';
import { IDataForCron } from 'src/types/interfaces';
import { Product } from 'src/product/product.entity';
import { Shop } from 'src/shop/shop.entity';

@Injectable()
export class ScraperShop0002 {
  constructor(
    @InjectRepository(PricesShop0002)
    private readonly pricesShopRepository: Repository<PricesShop0002>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async scrape(dataForCron: IDataForCron): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    try {
      for (const info of dataForCron.dataForScraper) {
        await page.goto(info.url);
        await page.waitForSelector(info.elementOnPage, { timeout: 10000 });
        const price: string | null = await page.$eval(
          info.elementOnPage,
          (element) => element.textContent,
        );

        if (price) {
          const shop = await this.shopRepository.findOne({
            where: { id: dataForCron.shop_id },
          });
          if (!shop) {
            console.error(`Shop with id '${dataForCron.shop_id}' not found`);
            continue;
          }

          const product = await this.productRepository.findOne({
            where: { id: info.product_id },
          });
          if (!product) {
            console.error(`Product with id ${info.product_id} not found`);
            continue;
          }

          const newEntry = new PricesShop0002();

          newEntry.shop_id = shop;
          newEntry.product_id = product;
          newEntry.price = Number(price.replace(/[^\d,]/g, '').replace(',', '.'));
          await this.pricesShopRepository.save(newEntry);

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
