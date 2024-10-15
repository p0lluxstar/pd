import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesShop0007Entity } from '../prices-shop-0007/prices-shop-0007.entity';
import { PricesShop0007Controller } from '../prices-shop-0007/prices-shop-0007.controller';
import { PricesShop0007Service } from '../prices-shop-0007/prices-shop-0007.service';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricesShop0007Entity, ProductEntity, CategoryEntity])],
  controllers: [PricesShop0007Controller],
  providers: [PricesShop0007Service],
})
export class PricesShop0007Module {}
