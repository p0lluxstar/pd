import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronShop0001 } from './services/crons/cron-shop-0001.service';
import { CronShop0002 } from './services/crons/cron-shop-0002.service';
import { CronShop0003 } from './services/crons/cron-shop-0003.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/configs/typeorm.config';
import { ProductEntity } from './product/product.entity';
import { ShopEntity } from './shop/shop.entity';
import { PricesShop0001Entity } from './prices/prices-shop-0001/prices-shop-0001.entity';
import { PricesShop0002Entity } from './prices/prices-shop-0002/prices-shop-0002.entity';
import { PricesShop0003 } from './prices/prices-shop-0003.entity';
import { ScraperUtilsService } from './services/scraper.service';
import { ShopModule } from './shop/shop.module';
import { PricesShop0001Module } from './prices/prices-shop-0001/prices-shop-0001.module';
import { PricesShop0002Module } from './prices/prices-shop-0002/prices-shop-0002.module';
import { CategoryEntity } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      ShopEntity,
      ProductEntity,
      CategoryEntity,
      PricesShop0001Entity,
      PricesShop0002Entity,
      PricesShop0003,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        ShopModule,
        CategoryModule,
        ProductModule,
        PricesShop0001Module,
        PricesShop0002Module,
      ],
      useFactory: () => typeOrmConfig(),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CronShop0001, CronShop0002, CronShop0003, ScraperUtilsService],
})
export class AppModule {}
