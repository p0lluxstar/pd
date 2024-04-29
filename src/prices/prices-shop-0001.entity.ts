import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from 'src/product/product.entity';

@Entity({ name: 'price-shop-0001' })
export class PricesShop0001 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column()
  shop_id: string;

  @ManyToOne(() => Product, product => product.product_id)
  @JoinColumn({name: 'product_id'})
  product_id: Product;

  /* @Column()
  product_id: string; */

  @Column({ type: 'numeric' })
  price: number;
}
