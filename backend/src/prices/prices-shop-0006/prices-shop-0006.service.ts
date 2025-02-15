import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0006Entity } from './prices-shop-0006.entity';
import { Repository } from 'typeorm';
import { PricesService } from '../PricesService';

@Injectable()
export class PricesShop0006Service extends PricesService<PricesShop0006Entity> {
  getPricesShop0006() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(PricesShop0006Entity)
    private readonly pricesShop0006Entity: Repository<PricesShop0006Entity>
  ) {
    super(pricesShop0006Entity);
  }

  protected getTableName(): string {
    return `"prices-shop-0006"`;
  }
}
