import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { ShopEntity } from 'src/shop/shop.entity';

@Entity({ name: 'prices-shop-0001' })
export class PricesShop0001Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @ManyToOne(() => ShopEntity, (shop) => shop.pricesShop0001)
  @JoinColumn({ name: 'shop_id' })
  shop_id: ShopEntity;

  @ManyToOne(() => Product, (product) => product.pricesShop0001)
  @JoinColumn({ name: 'product_id' })
  product_id: Product;

  @Column({ type: 'numeric' })
  price: number;
  newEntry: ShopEntity;
}
