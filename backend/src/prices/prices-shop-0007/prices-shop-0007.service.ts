import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0007Entity } from './prices-shop-0007.entity';
import { Repository } from 'typeorm';
import { PricesService } from '../PricesService';

@Injectable()
export class PricesShop0007Service extends PricesService<PricesShop0007Entity> {
  getPricesShop0007() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(PricesShop0007Entity)
    private readonly pricesShop0007Entity: Repository<PricesShop0007Entity>
  ) {
    super(pricesShop0007Entity);
  }

  protected getTableName(): string {
    return `"prices-shop-0007"`;
  }
}
