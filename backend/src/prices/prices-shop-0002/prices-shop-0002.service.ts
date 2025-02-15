import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0002Entity } from './prices-shop-0002.entity';
import { Repository } from 'typeorm';
import { PricesService } from '../PricesService';

@Injectable()
export class PricesShop0002Service extends PricesService<PricesShop0002Entity> {
  getPricesShop0002() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(PricesShop0002Entity)
    private readonly pricesShop0002Entity: Repository<PricesShop0002Entity>
  ) {
    super(pricesShop0002Entity);
  }

  protected getTableName(): string {
    return `"prices-shop-0002"`;
  }
}
