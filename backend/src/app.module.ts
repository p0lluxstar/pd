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
import { Product } from './product/product.entity';
import { ShopEntity } from './shop/shop.entity';
import { PricesShop0001Entity } from './prices/prices-shop-0001/prices-shop-0001.entity';
import { PricesShop0002 } from './prices/prices-shop-0002.entity';
import { PricesShop0003 } from './prices/prices-shop-0003.entity';
import { ScraperUtilsService } from './services/scraper.service';
import { ShopModule } from './shop/shop.module';
import { PricesShop0001Module } from './prices/prices-shop-0001/prices-shop-0001.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ShopEntity, Product, PricesShop0001Entity, PricesShop0002, PricesShop0003]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ShopModule, PricesShop0001Module],
      useFactory: () => typeOrmConfig(),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CronShop0001, CronShop0002, CronShop0003, ScraperUtilsService],
})
export class AppModule {}
