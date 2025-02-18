import { Controller, Get, Query } from '@nestjs/common';
import { PricesShop0003Service } from './prices-shop-0003.service';

@Controller('prices-shop-0003')
export class PricesShop0003Controller {
  constructor(private readonly priceShop0003Service: PricesShop0003Service) {}
  @Get()
  getPricesShop0003() {
    return this.priceShop0003Service.getPricesShop0003();
  }

  @Get('filter')
  async findPricesByProductIdAndDate(
    @Query('shopId') shop_id?: string,
    @Query('categoryId') category_id?: string,
    @Query('productId') product_id?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.priceShop0003Service.findPricesByProductIdAndDate(shop_id, category_id, product_id, startDate, endDate);
  }

  @Get('products')
  async getProducts(@Query('categoryId') categoryId: string) {
    return this.priceShop0003Service.getProducts(categoryId);
  }
}
