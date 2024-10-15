import { Controller, Get, Query } from '@nestjs/common';
import { PricesShop0007Service } from './prices-shop-0007.service';

@Controller('prices-shop-0007')
export class PricesShop0007Controller {
  constructor(private readonly priceShop0007Service: PricesShop0007Service) {}
  @Get()
  getPricesShop0007() {
    return this.priceShop0007Service.getPricesShop0007();
  }

  @Get('filter')
  async findPricesByProductIdAndDate(
    @Query('productId') product_id: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.priceShop0007Service.findPricesByProductIdAndDate(product_id, startDate, endDate);
  }

  @Get('products')
  async getProducts(@Query('categoryId') categoryId: string) {
    return this.priceShop0007Service.getProducts(categoryId);
  }
}
