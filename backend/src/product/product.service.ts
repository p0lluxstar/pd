import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async getProducts() {
    return await this.productRepository.find();
  }

  async getProduct(product_id: string) {
    return await this.productRepository.find({
      where: { id: product_id },
    });
  }
}
