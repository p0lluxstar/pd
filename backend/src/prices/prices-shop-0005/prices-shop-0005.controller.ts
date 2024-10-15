import { Controller, Get, Query } from '@nestjs/common';
import { PricesShop0005Service } from './prices-shop-0005.service';

@Controller('prices-shop-0005')
export class PricesShop0005Controller {
  constructor(private readonly priceShop0005Service: PricesShop0005Service) {}
  @Get()
  getPricesShop0005() {
    return this.priceShop0005Service.getPricesShop0005();
  }

  @Get('filter')
  async findPricesByProductIdAndDate(
    @Query('productId') product_id: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.priceShop0005Service.findPricesByProductIdAndDate(product_id, startDate, endDate);
  }

  @Get('products')
  async getProducts(@Query('categoryId') categoryId: string) {
    return this.priceShop0005Service.getProducts(categoryId);
  }
}
