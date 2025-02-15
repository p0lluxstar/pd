import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { ShopEntity } from 'src/shop/shop.entity';

@Entity({ name: 'prices-shop-0006' })
export class PricesShop0006Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    name: 'date',
    default: () => 'CURRENT_DATE',
  })
  date: Date;

  @ManyToOne(() => ShopEntity, (shop) => shop.pricesShop0006)
  @JoinColumn({ name: 'shop_id' })
  shop_id: ShopEntity;

  @ManyToOne(() => ProductEntity, (product) => product.pricesShop0006)
  @JoinColumn({ name: 'product_id' })
  product_id: ProductEntity;

  @Column({ type: 'numeric' })
  price: number;
}
