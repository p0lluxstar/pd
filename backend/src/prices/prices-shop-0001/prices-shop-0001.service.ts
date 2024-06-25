import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0001Entity } from './prices-shop-0001.entity';
import { Between, Equal, Repository } from 'typeorm';

@Injectable()
export class PricesShop0001Service {
  constructor(
    @InjectRepository(PricesShop0001Entity)
    private readonly pricesShop0001Entity: Repository<PricesShop0001Entity>
  ) {}
  async getPricesShop0001() {
    return await this.pricesShop0001Entity.find();
  }

  async findPricesByProductIdAndDate(product_id: string, startDate?: string, endDate?: string) {
    const query = this.pricesShop0001Entity
      .createQueryBuilder('prices')
      .innerJoinAndSelect('prices.shop_id', 'shop')
      .where('prices.product_id = :product_id', { product_id });

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      query.andWhere('prices.date BETWEEN :start AND :end', { start, end });
    }

    const result = await query.getMany();

    // Форматируем результат для добавления nameShop
    return result.map((price) => ({
      id: price.id,
      date: price.date,
      price: price.price,
      shopName: price.shop_id.name,
      shopId: price.shop_id.id,
    }));
  }

  async getProducts(category_id: string) {
    return await this.pricesShop0001Entity.query(
      `SELECT DISTINCT p.id AS id, p.name AS name
     FROM "prices-shop-0001" ps
     JOIN products p ON ps.product_id = p.id
     WHERE p.category_id = $1
     ORDER BY p.name`,
      [category_id]
    );
  }
}
