import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './services/crons/cron.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperService } from './services/scraper.service';
import { Product } from './product/product.entity';
import { typeOrmConfig } from 'src/configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () =>
        typeOrmConfig(),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CronService, ScraperService],
})
export class AppModule {}
