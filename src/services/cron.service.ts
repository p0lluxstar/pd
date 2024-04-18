import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { product1 } from 'src/products/product1';
import { product2 } from 'src/products/product2';

@Injectable()
export class CronService {
  @Cron('*/30 * * * * *')
  handleCron() {
    product1();
    product2();
  }
}
