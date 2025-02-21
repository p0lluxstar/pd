import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronShop0001 } from './services/crons/cron-shop-0001.service';
import { CronShop0002 } from './services/crons/cron-shop-0002.service';
import { CronShop0003 } from './services/crons/cron-shop-0003.service';
import { CronShop0004 } from './services/crons/cron-shop-0004.service';
import { CronShop0005 } from './services/crons/cron-shop-0005.service';
import { CronShop0006 } from './services/crons/cron-shop-0006.service';
import { CronShop0007 } from './services/crons/cron-shop-0007.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/configs/typeorm.config';
import { ProductEntity } from './product/product.entity';
import { ShopEntity } from './shop/shop.entity';
import { PricesShop0001Entity } from './prices/prices-shop-0001/prices-shop-0001.entity';
import { PricesShop0002Entity } from './prices/prices-shop-0002/prices-shop-0002.entity';
import { PricesShop0003Entity } from './prices/prices-shop-0003/prices-shop-0003.entity';
import { PricesShop0004Entity } from './prices/prices-shop-0004/prices-shop-0004.entity';
import { PricesShop0005Entity } from './prices/prices-shop-0005/prices-shop-0005.entity';
import { PricesShop0006Entity } from './prices/prices-shop-0006/prices-shop-0006.entity';
import { PricesShop0007Entity } from './prices/prices-shop-0007/prices-shop-0007.entity';
import { ScraperUtilsService } from './services/scraper.service';
import { ShopModule } from './shop/shop.module';
import { PricesShop0001Module } from './prices/prices-shop-0001/prices-shop-0001.module';
import { PricesShop0002Module } from './prices/prices-shop-0002/prices-shop-0002.module';
import { PricesShop0003Module } from './prices/prices-shop-0003/prices-shop-0003.module';
import { PricesShop0004Module } from './prices/prices-shop-0004/prices-shop-0004.module';
import { PricesShop0005Module } from './prices/prices-shop-0005/prices-shop-0005.module';
import { PricesShop0006Module } from './prices/prices-shop-0006/prices-shop-0006.module';
import { PricesShop0007Module } from './prices/prices-shop-0007/prices-shop-0007.module';
import { CategoryEntity } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env'], // Поднимаемся на уровень выше, чтобы прочитать корневой .env
      isGlobal: true, // Доступ ко всем модулям
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      ShopEntity,
      ProductEntity,
      CategoryEntity,
      PricesShop0001Entity,
      PricesShop0002Entity,
      PricesShop0003Entity,
      PricesShop0004Entity,
      PricesShop0005Entity,
      PricesShop0006Entity,
      PricesShop0007Entity
    ]),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        ShopModule,
        CategoryModule,
        ProductModule,
        PricesShop0001Module,
        PricesShop0002Module,
        PricesShop0003Module,
        PricesShop0004Module,
        PricesShop0005Module,
        PricesShop0006Module,
        PricesShop0007Module
      ],
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
    CronShop0004,
    CronShop0005,
    CronShop0006,
    CronShop0007,
    ScraperUtilsService,
  ],
})
export class AppModule {}
