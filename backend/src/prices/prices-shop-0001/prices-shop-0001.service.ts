import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0001Entity } from './prices-shop-0001.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';

@Injectable()
export class PriceShop0001Service {
  constructor(
    @InjectRepository(PricesShop0001Entity)
    private readonly pricesShop0001: Repository<PricesShop0001Entity>,

    @InjectRepository(Product)
    private readonly product: Repository<Product>
  ) {}
  async getPricesShop0001() {
    return await this.pricesShop0001.find();
  }

  async findPricesByProductId(product_id: string) {
    return await this.pricesShop0001.find({
      where: { product_id: { id: product_id } },
    });
  }
}
