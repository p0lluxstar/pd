import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesShop0005Entity } from './prices-shop-0005.entity';
import { PricesShop0005Controller } from './prices-shop-0005.controller';
import { PricesShop0005Service } from './prices-shop-0005.service';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricesShop0005Entity, ProductEntity, CategoryEntity])],
  controllers: [PricesShop0005Controller],
  providers: [PricesShop0005Service],
})
export class PricesShop0005Module {}
