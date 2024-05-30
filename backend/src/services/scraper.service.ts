import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShopEntity } from 'src/shop/shop.entity';
import { ProductEntity } from 'src/product/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataForCron } from 'src/types/interfaces';
import puppeteer from 'puppeteer';

@Injectable()
export class ScraperUtilsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>
  ) {}

  async getPrice(page: any, info: any): Promise<string | null> {
    await page.goto(info.url, { waitUntil: 'load', timeout: 0 });
    await page.waitForSelector(info.elementOnPage);
    return await page.$eval(info.elementOnPage, (element) => element.textContent);
  }

  async getShop(shopId: string): Promise<ShopEntity | undefined> {
    return this.shopRepository.findOne({ where: { id: shopId } });
  }

  async getProduct(productId: string): Promise<ProductEntity | undefined> {
    return this.productRepository.findOne({ where: { id: productId } });
  }

  async scrape(
    dataForCron: IDataForCron,
    PricesShop,
    prisesShopRepository,
    parsePrice
  ): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    try {
      for (const info of dataForCron.dataForScraper) {
        const price = await this.getPrice(page, info);
        if (price) {
          const shop = await this.getShop(dataForCron.shop_id);
          const product = await this.getProduct(info.product_id);

          if (!shop || !product) {
            console.log('Shop or product not found in database!');
            continue;
          }

          const newEntry = new PricesShop();
          newEntry.shop_id = shop;
          newEntry.product_id = product;
          newEntry.price = parsePrice(price);
          await prisesShopRepository.save(newEntry);

          console.log(
            `Shop id: '${dataForCron.shop_id}', product id: '${info.product_id}', successfully written to the database.`
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
