import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (category_id) => category_id.category_id)
  @JoinColumn({ name: 'category_id' })
  product: ProductEntity[];
}
