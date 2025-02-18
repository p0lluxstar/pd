import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesShop0006Entity } from './prices-shop-0006.entity';
import { PricesShop0006Controller } from './prices-shop-0006.controller';
import { PricesShop0006Service } from './prices-shop-0006.service';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricesShop0006Entity, ProductEntity, CategoryEntity])],
  controllers: [PricesShop0006Controller],
  providers: [PricesShop0006Service],
})
export class PricesShop0006Module {}
