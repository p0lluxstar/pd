import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesShop0002Entity } from './prices-shop-0002.entity';
import { PricesShop0002Controller } from './prices-shop-0002.controller';
import { PriceShop0002Service } from './prices-shop-0002.service';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricesShop0002Entity, ProductEntity, CategoryEntity])],
  controllers: [PricesShop0002Controller],
  providers: [PriceShop0002Service],
})
export class PricesShop0002Module {}
