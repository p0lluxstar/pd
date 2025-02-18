import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesShop0003Entity } from './prices-shop-0003.entity';
import { Repository } from 'typeorm';
import { PricesService } from '../PricesService';

@Injectable()
export class PricesShop0003Service extends PricesService<PricesShop0003Entity> {
  getPricesShop0003() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(PricesShop0003Entity)
    private readonly pricesShop0003Entity: Repository<PricesShop0003Entity>
  ) {
    super(pricesShop0003Entity);
  }

  protected getTableName(): string {
    return `"prices-shop-0003"`;
  }
}
