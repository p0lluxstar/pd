import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('filter')
  async getProductsByFilter(
    @Query('productId') product_id?: string,
    @Query('categoryId') category_id?: string
  ) {
    if (product_id) {
      return this.productService.getProductByProductId(product_id);
    } else if (category_id) {
      return this.productService.getProductsByCategoryId(category_id);
    } else {
      throw new BadRequestException('Either productId or categoryId must be provided');
    }
  }
}
