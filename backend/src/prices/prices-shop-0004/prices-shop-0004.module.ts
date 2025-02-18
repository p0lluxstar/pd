import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesShop0004Entity } from './prices-shop-0004.entity';
import { PricesShop0004Controller } from './prices-shop-0004.controller';
import { PricesShop0004Service } from './prices-shop-0004.service';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricesShop0004Entity, ProductEntity, CategoryEntity])],
  controllers: [PricesShop0004Controller],
  providers: [PricesShop0004Service],
})
export class PricesShop0004Module {}
