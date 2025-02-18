import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { ShopEntity } from 'src/shop/shop.entity';

@Entity({ name: 'prices-shop-0001' })
export class PricesShop0001Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    name: 'date',
    default: () => 'CURRENT_DATE',
  })
  date: Date;

  @ManyToOne(() => ShopEntity, (shop) => shop.pricesShop0001)
  @JoinColumn({ name: 'shop_id' })
  shop_id: ShopEntity;

  @ManyToOne(() => ProductEntity, (product) => product.pricesShop0001)
  @JoinColumn({ name: 'product_id' })
  product_id: ProductEntity;

  @Column({ type: 'numeric' })
  price: number;
}
