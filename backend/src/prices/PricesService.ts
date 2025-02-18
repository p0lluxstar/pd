import { Repository } from 'typeorm';

export interface PriceEntity {
  id: number;
  date: Date;
  price: number;
}

export abstract class PricesService<T extends PriceEntity> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async getPrices() {
    return await this.repository.find();
  }

  async findPricesByProductIdAndDate(
    shop_id?: string,
    category_id?: string,
    product_id?: string,
    startDate?: string,
    endDate?: string
  ) {
    if (product_id) {
      const query = this.repository
        .createQueryBuilder('prices')
        .innerJoinAndSelect('prices.shop_id', 'shop')
        .where('prices.product_id = :product_id', { product_id });

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.andWhere('prices.date BETWEEN :start AND :end', { start, end });
      }

      query.orderBy('prices.id', 'ASC');

      const result = await query.getMany();

      return result.map((price) => ({
        id: price.id,
        date: price.date,
        price: price.price,
      }));
    }

    if (shop_id && category_id && startDate && endDate) {
      return await this.repository.query(
        `SELECT 
          p.id AS id,
          p.name AS name,
          ps.price AS price,
          TO_CHAR(ps.date, 'DD-MM-YYYY') AS date
        FROM 
          ${this.getTableName()} ps
        JOIN 
          products p ON ps.product_id = p.id
        JOIN 
          categories c ON p.category_id = c.id
        WHERE 
          c.id = $1 
          AND ps.shop_id = $2
          AND ps.date BETWEEN $3 AND $4
        ORDER BY 
          ps.date ASC`,
        [category_id, shop_id, startDate, endDate]
      );
    }
  }

  async getProducts(category_id: string) {
    return await this.repository.query(
      `SELECT DISTINCT p.id AS id, p.name AS name
        FROM ${this.getTableName()} ps
        JOIN products p ON ps.product_id = p.id
        WHERE p.category_id = $1
        ORDER BY p.name`,
      [category_id]
    );
  }

  protected abstract getTableName(): string;
}
