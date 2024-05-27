import { Controller, Get, Query } from '@nestjs/common';
import { PriceShop0001Service } from './prices-shop-0001.service';

@Controller('prices-shop-0001')
export class PricesShop0001Controller {
  constructor(private readonly priceShop0001Service: PriceShop0001Service) {}
  @Get()
  getPricesShop0001() {
    return this.priceShop0001Service.getPricesShop0001();
  }

  @Get('filter')
  async getPricesByProductId(@Query('productId') productId: string) {
    return this.priceShop0001Service.findPricesByProductId(productId);
  }

  @Get('unique-product-ids')
  async getUniqueProductIds() {
    return this.priceShop0001Service.getUniqueProductIds();
  }
}
