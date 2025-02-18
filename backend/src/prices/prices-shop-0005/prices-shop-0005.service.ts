import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0005Entity } from './prices-shop-0005.entity';
import { Repository } from 'typeorm';
import { PricesService } from '../PricesService';

@Injectable()
export class PricesShop0005Service extends PricesService<PricesShop0005Entity> {
  getPricesShop0005() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(PricesShop0005Entity)
    private readonly pricesShop0005Entity: Repository<PricesShop0005Entity>
  ) {
    super(pricesShop0005Entity);
  }

  protected getTableName(): string {
    return `"prices-shop-0005"`;
  }
}
