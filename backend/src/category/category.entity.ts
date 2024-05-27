import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Product } from 'src/product/product.entity';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Product, (category_id) => category_id.category_id)
  @JoinColumn({ name: 'category_id' })
  product: Product[];
}
