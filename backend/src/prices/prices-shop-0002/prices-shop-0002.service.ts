import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0002Entity } from './prices-shop-0002.entity';
import { Between, Equal, Repository } from 'typeorm';

@Injectable()
export class PriceShop0002Service {
  constructor(
    @InjectRepository(PricesShop0002Entity)
    private readonly pricesShop0002Entity: Repository<PricesShop0002Entity>
  ) {}
  async getPricesShop0002() {
    return await this.pricesShop0002Entity.find();
  }

  async findPricesByProductIdAndDate(product_id: string, startDate?: string, endDate?: string) {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Убедитесь, что конец диапазона включает конец дня
      end.setHours(23, 59, 59, 999);

      return await this.pricesShop0002Entity.find({
        where: {
          product_id: Equal(product_id),
          date: Between(start, end),
        },
      });
    }

    return await this.pricesShop0002Entity.find({
      where: { product_id: Equal(product_id) },
    });
  }

  async getProducts(category_id: string) {
    return await this.pricesShop0002Entity.query(
      `SELECT DISTINCT p.id AS id, p.name AS name
      FROM "prices-shop-0002" ps
      JOIN products p ON ps.product_id = p.id
      WHERE p.category_id = $1
      ORDER BY p.name`,
       [category_id]
    );
  }
}
