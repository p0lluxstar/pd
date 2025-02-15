import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0004Entity } from './prices-shop-0004.entity';
import { Repository } from 'typeorm';
import { PricesService } from '../PricesService';

@Injectable()
export class PricesShop0004Service extends PricesService<PricesShop0004Entity> {
  getPricesShop0004() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(PricesShop0004Entity)
    private readonly pricesShop0004Entity: Repository<PricesShop0004Entity>
  ) {
    super(pricesShop0004Entity);
  }

  protected getTableName(): string {
    return `"prices-shop-0004"`;
  }
}
