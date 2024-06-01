import { Entity, Column, OneToMany, JoinColumn, PrimaryColumn } from 'typeorm';
import { PricesShop0001Entity } from 'src/prices/prices-shop-0001/prices-shop-0001.entity';
import { PricesShop0002Entity } from 'src/prices/prices-shop-0002/prices-shop-0002.entity';
import { PricesShop0003 } from 'src/prices/prices-shop-0003.entity';

@Entity({ name: 'shops' })
export class ShopEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => PricesShop0001Entity, (shop) => shop.shop_id)
  @JoinColumn({ name: 'shop_id' })
  pricesShop0001: PricesShop0001Entity[];

  @OneToMany(() => PricesShop0002Entity, (shop) => shop.shop_id)
  @JoinColumn({ name: 'shop_id' })
  PricesShop0002: PricesShop0002Entity[];

  @OneToMany(() => PricesShop0003, (shop) => shop.shop_id)
  @JoinColumn({ name: 'shop_id' })
  PricesShop0003: PricesShop0003[];
}
