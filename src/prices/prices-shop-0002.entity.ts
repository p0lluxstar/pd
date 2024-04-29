import { Product } from 'src/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'price-shop-0002' })
export class PricesShop0002 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column()
  shop_id: string;

  @ManyToOne(() => Product, (product) => product.product_id)
  @JoinColumn({ name: 'product_id' })
  product_id: Product;

  @Column({ type: 'numeric' })
  price: number;
}
