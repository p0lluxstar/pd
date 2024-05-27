import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0001Entity } from './prices-shop-0001.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PriceShop0001Service {
  constructor(
    @InjectRepository(PricesShop0001Entity)
    private readonly pricesShop0001: Repository<PricesShop0001Entity>
  ) {}
  async getPricesShop0001() {
    return await this.pricesShop0001.find();
  }

  async findPricesByProductId(product_id: string) {
    return await this.pricesShop0001.find({
      where: { product_id: { id: product_id } },
    });
  }

  async getUniqueProductIds() {
    return await this.pricesShop0001.query(
      `SELECT p.name AS product_name, s.name AS shop_name, ps.price, ps.date, ps.product_id
        FROM "prices-shop-0001" ps
        JOIN products p ON ps.product_id = p.id
        JOIN shops s ON ps.shop_id = s.id
        WHERE ps.date >= '2024-04-01' AND ps.date <= '2024-05-31'
        ORDER BY p.name, ps.date ASC`
    );
  }
}
