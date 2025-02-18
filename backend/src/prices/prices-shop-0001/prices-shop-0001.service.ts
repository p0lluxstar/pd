import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0001Entity } from './prices-shop-0001.entity';
import { Repository } from 'typeorm';
import { PricesService } from '../PricesService';

@Injectable()
export class PricesShop0001Service extends PricesService<PricesShop0001Entity> {
  getPricesShop0001() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(PricesShop0001Entity)
    private readonly pricesShop0001Entity: Repository<PricesShop0001Entity>
  ) {
    super(pricesShop0001Entity);
  }

  protected getTableName(): string {
    return `"prices-shop-0001"`;
  }
}
