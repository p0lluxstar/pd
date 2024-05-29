import { Controller, Get, Query } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
  @Get()
  getShops() {
    return this.shopService.getShops();
  }

  @Get('filter')
  async getShop(@Query('shopId') shop_id: string) {
    return this.shopService.getShop(shop_id);
  }
}
