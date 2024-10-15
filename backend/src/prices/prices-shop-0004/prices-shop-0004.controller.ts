import { Controller, Get, Query } from '@nestjs/common';
import { PricesShop0004Service } from './prices-shop-0004.service';

@Controller('prices-shop-0004')
export class PricesShop0004Controller {
  constructor(private readonly priceShop0004Service: PricesShop0004Service) {}
  @Get()
  getPricesShop0004() {
    return this.priceShop0004Service.getPricesShop0004();
  }

  @Get('filter')
  async findPricesByProductIdAndDate(
    @Query('productId') product_id: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.priceShop0004Service.findPricesByProductIdAndDate(product_id, startDate, endDate);
  }

  @Get('products')
  async getProducts(@Query('categoryId') categoryId: string) {
    return this.priceShop0004Service.getProducts(categoryId);
  }
}
