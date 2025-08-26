import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShopEntity } from 'src/shop/shop.entity';
import { ProductEntity } from 'src/product/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataForCron } from 'src/types/interfaces';
import puppeteer from 'puppeteer';
import loggerScraper from 'src/utils/loggerScraper.utils';

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

  // настройка для запуска скрапера на windows
  // const browser = await puppeteer.launch({
  //     headless: false,
  //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
  //     executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  //   });

  async scrape(
    dataForCron: IDataForCron,
    PricesShop,
    prisesShopRepository,
    parsePrice
  ): Promise<void> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--remote-debugging-port=9222'],
      executablePath: '/usr/bin/chromium-browser',
    });
    const page = await browser.newPage();

    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
    await page.setUserAgent(userAgent);

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    try {
      for (const info of dataForCron.dataForScraper) {
        try {
          const price = await this.getPrice(page, info);
          if (price) {
            const shop = await this.getShop(dataForCron.shop_id);
            const product = await this.getProduct(info.product_id);

            if (!shop || !product) {
              console.log('Магазин или продукт не найдены в базе данных!');
              continue;
            }

            const newEntry = new PricesShop();
            newEntry.shop_id = shop;
            newEntry.product_id = product;
            newEntry.price = parsePrice(price);
            await prisesShopRepository.save(newEntry);

            console.log(
              `Магазин id: '${dataForCron.shop_id}', продукт id: '${info.product_id}', успешно записан в базу данных.`
            );
          }
        } catch (err) {
          const errorMessage = `Ошибка при обработке продукта. Mагазин id: '${dataForCron.shop_id}', продукт id: '${info.product_id}': ${err}`;
          console.error(errorMessage);
          loggerScraper(errorMessage);
          continue;
        }
      }
    } catch (err) {
      console.error('Общая ошибка при скрапинге:', err);
    } finally {
      await browser.close();
    }
  }
}
