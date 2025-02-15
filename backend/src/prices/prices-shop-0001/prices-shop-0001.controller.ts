import { Controller, Get, Query } from '@nestjs/common';
import { PricesShop0001Service } from './prices-shop-0001.service';

@Controller('prices-shop-0001')
export class PricesShop0001Controller {
  constructor(private readonly priceShop0001Service: PricesShop0001Service) {}
  @Get()
  getPricesShop0001() {
    return this.priceShop0001Service.getPricesShop0001();
  }

  @Get('filter')
  async findPricesByProductIdAndDate(
    @Query('shopId') shop_id?: string,
    @Query('categoryId') category_id?: string,
    @Query('productId') product_id?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.priceShop0001Service.findPricesByProductIdAndDate(shop_id, category_id, product_id, startDate, endDate);
  }

  @Get('products')
  async getProducts(@Query('categoryId') categoryId: string) {
    return this.priceShop0001Service.getProducts(categoryId);
  }
}
