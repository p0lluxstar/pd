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
import { Shop } from './shop/shop.entity';
import { ScraperShop0001 } from './services/srapers/scraper-shop-0001.service';
import { ScraperShop0002 } from './services/srapers/scraper-shop-0002.service';
import { ScraperShop0003 } from './services/srapers/scraper-shop-0003.service';
import { PricesShop0001 } from './prices/prices-shop-0001.entity';
import { PricesShop0002 } from './prices/prices-shop-0002.entity';
import { PricesShop0003 } from './prices/prices-shop-0003.entity';
import { ScraperUtilsService } from './services/srapers/scraperUtilsService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      Shop,
      Product,
      PricesShop0001,
      PricesShop0002,
      PricesShop0003,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => typeOrmConfig(),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CronShop0001,
    CronShop0002,
    CronShop0003,
    ScraperShop0001,
    ScraperShop0002,
    ScraperShop0003,
    ScraperUtilsService
  ],
})
export class AppModule {}
