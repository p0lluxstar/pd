import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shop } from 'src/shop/shop.entity';
import { Product } from 'src/product/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScraperUtilsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async getPrice(page: any, info: any): Promise<string | null> {
    await page.goto(info.url);
    await page.waitForSelector(info.elementOnPage, { timeout: 10000 });
    return await page.$eval(
      info.elementOnPage,
      (element) => element.textContent,
    );
  }

  async getShop(shopId: string): Promise<Shop | undefined> {
    return this.shopRepository.findOne({ where: { id: shopId } });
  }

  async getProduct(productId: string): Promise<Product | undefined> {
    return this.productRepository.findOne({ where: { id: productId } });
  }
}
