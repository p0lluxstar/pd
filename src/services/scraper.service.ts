import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import puppeteer from 'puppeteer-extra';
import { Product } from '../product/entity/product.entity';
import { ProductInfo } from '../types/interfaces';

@Injectable()
export class ScraperService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async scrape(productInfo: ProductInfo[]): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    try {
      for (const info of productInfo) {
        await page.goto(info.url);
        await page.waitForSelector(info.element, { timeout: 5000 });
        const price: string | null = await page.$eval(
          info.element,
          (span) => span.textContent,
        );

        if (price) {
          const product = new Product();
          product.shop = info.shop;
          product.price = price.replace(/[^\d,]/g, '');
          await this.productRepository.save(product);

          console.log(
            ` The data for the store ${info.shop} has been successfully written to the database.`,
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
