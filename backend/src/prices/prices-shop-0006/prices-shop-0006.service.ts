import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0006Entity } from '../prices-shop-0006/prices-shop-0006.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PricesShop0006Service {
  constructor(
    @InjectRepository(PricesShop0006Entity)
    private readonly pricesShop0006Entity: Repository<PricesShop0006Entity>
  ) {}
  async getPricesShop0006() {
    return await this.pricesShop0006Entity.find();
  }

  async findPricesByProductIdAndDate(product_id: string, startDate?: string, endDate?: string) {
    const query = this.pricesShop0006Entity
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
    return await this.pricesShop0006Entity.query(
      `SELECT DISTINCT p.id AS id, p.name AS name
     FROM "prices-shop-0006" ps
     JOIN products p ON ps.product_id = p.id
     WHERE p.category_id = $1
     ORDER BY p.name`,
      [category_id]
    );
  }
}
