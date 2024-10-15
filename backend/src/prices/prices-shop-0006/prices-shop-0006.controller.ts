import { Controller, Get, Query } from '@nestjs/common';
import { PricesShop0006Service } from './prices-shop-0006.service';

@Controller('prices-shop-0006')
export class PricesShop0006Controller {
  constructor(private readonly priceShop0006Service: PricesShop0006Service) {}
  @Get()
  getPricesShop0006() {
    return this.priceShop0006Service.getPricesShop0006();
  }

  @Get('filter')
  async findPricesByProductIdAndDate(
    @Query('productId') product_id: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.priceShop0006Service.findPricesByProductIdAndDate(product_id, startDate, endDate);
  }

  @Get('products')
  async getProducts(@Query('categoryId') categoryId: string) {
    return this.priceShop0006Service.getProducts(categoryId);
  }
}
