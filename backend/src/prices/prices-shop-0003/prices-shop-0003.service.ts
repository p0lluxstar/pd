import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0003Entity } from '../prices-shop-0003/prices-shop-0003.entity';
import { Between, Equal, Repository } from 'typeorm';

@Injectable()
export class PricesShop0003Service {
  constructor(
    @InjectRepository(PricesShop0003Entity)
    private readonly pricesShop0003Entity: Repository<PricesShop0003Entity>
  ) {}
  async getPricesShop0003() {
    return await this.pricesShop0003Entity.find();
  }

  async findPricesByProductIdAndDate(product_id: string, startDate?: string, endDate?: string) {
    const query = this.pricesShop0003Entity
      .createQueryBuilder('prices')
      .innerJoinAndSelect('prices.shop_id', 'shop')
      .where('prices.product_id = :product_id', { product_id });

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      query.andWhere('prices.date BETWEEN :start AND :end', { start, end });
    }

    query.orderBy('prices.id', 'ASC'); // Добавляем сортировку по id по возрастанию

    const result = await query.getMany();

    // Форматируем результат для добавления nameShop

    return result.map((price) => ({
      id: price.id,
      date: price.date,
      price: price.price,
    }));
  }

  async getProducts(category_id: string) {
    return await this.pricesShop0003Entity.query(
      `SELECT DISTINCT p.id AS id, p.name AS name
     FROM "prices-shop-0003" ps
     JOIN products p ON ps.product_id = p.id
     WHERE p.category_id = $1
     ORDER BY p.name`,
      [category_id]
    );
  }
}
