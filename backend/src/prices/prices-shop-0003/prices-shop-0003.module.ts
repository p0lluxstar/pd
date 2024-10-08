import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesShop0003Entity } from '../prices-shop-0003/prices-shop-0003.entity';
import { PricesShop0003Controller } from '../prices-shop-0003/prices-shop-0003.controller';
import { PricesShop0003Service } from '../prices-shop-0003/prices-shop-0003.service';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricesShop0003Entity, ProductEntity, CategoryEntity])],
  controllers: [PricesShop0003Controller],
  providers: [PricesShop0003Service],
})
export class PricesShop0003Module {}
