import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from './shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>
  ) {}
  async getShops() {
    return await this.shopRepository.find({
      order: {
        name: 'ASC', // Сортировка по имени в алфавитном порядке (ASC - по возрастанию)
      },
    });
  }

  async getShopById(shop_id: string) {
    return await this.shopRepository.find({
      where: { id: shop_id },
    });
  }
}
