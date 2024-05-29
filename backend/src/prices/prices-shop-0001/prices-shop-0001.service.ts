import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0001Entity } from './prices-shop-0001.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/category/category.entity';

@Injectable()
export class PriceShop0001Service {
  constructor(
    @InjectRepository(PricesShop0001Entity)
    private readonly pricesShop0001Entity: Repository<PricesShop0001Entity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>
  ) {}
  async getPricesShop0001() {
    return await this.pricesShop0001Entity.find();
  }

  async findPricesByProductId(product_id: string) {
    return await this.pricesShop0001Entity.find({
      where: { product_id: { id: product_id } },
    });
  }

  async getCategories() {
    return await this.categoryEntity.find();
  }

  async getProducts(category_id: string) {
    return await this.pricesShop0001Entity.query(
      `SELECT DISTINCT p.name
      FROM "prices-shop-0001" ps
      JOIN products p ON ps.product_id = p.id
      WHERE p.category_id = $1
      ORDER BY p.name`,
      [category_id]
    );
  }
}
