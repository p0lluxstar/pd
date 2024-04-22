import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import puppeteer from 'puppeteer-extra';
import { Product } from '../product/entity/product.entity';
import { IDataProduct } from 'src/types/interfaces';

@Injectable()
export class ScraperService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async scrape(productInfo: IDataProduct): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    try {
      for (const info of productInfo.dataShop) {
        await page.goto(info.url);
        await page.waitForSelector(info.elementOnPage, { timeout: 10000 });
        const price: string | null = await page.$eval(
          info.elementOnPage,
          (element) => element.textContent,
        );

        if (price) {
          const product = new Product();
          product.id_product = productInfo.idProduct
          product.name_product = productInfo.nameProduct
          product.name_shop = info.nameShop
          product.price = price.replace(/[^\d,]/g, '');
          await this.productRepository.save(product);

          console.log(
            ` The data for the store ${info.nameShop} has been successfully written to the database.`,
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
