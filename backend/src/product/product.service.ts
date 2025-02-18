import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async getProducts() {
    return await this.productRepository.find();
  }

   async getProductByProductId(product_id: string) {
    return await this.productRepository.find({
      where: { id: product_id },
      relations: ['category_id'],
    });
  }

  async getProductsByCategoryId(category_id: string) {
    return await this.productRepository
      .createQueryBuilder('product')
      .where('product.category_id = :category_id', { category_id })
      .getMany();
  }
}
