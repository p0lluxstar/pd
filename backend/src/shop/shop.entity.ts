import { Entity, Column, OneToMany, JoinColumn, PrimaryColumn } from 'typeorm';
import { PricesShop0001Entity } from 'src/prices/prices-shop-0001/prices-shop-0001.entity';
import { PricesShop0002Entity } from 'src/prices/prices-shop-0002/prices-shop-0002.entity';
import { PricesShop0003Entity } from 'src/prices/prices-shop-0003/prices-shop-0003.entity';
import { PricesShop0004Entity } from 'src/prices/prices-shop-0004/prices-shop-0004.entity';
import { PricesShop0005Entity } from 'src/prices/prices-shop-0005/prices-shop-0005.entity';
import { PricesShop0006Entity } from 'src/prices/prices-shop-0006/prices-shop-0006.entity';
import { PricesShop0007Entity } from 'src/prices/prices-shop-0007/prices-shop-0007.entity';

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
  pricesShop0002: PricesShop0002Entity[];

  @OneToMany(() => PricesShop0003Entity, (shop) => shop.shop_id)
  @JoinColumn({ name: 'shop_id' })
  pricesShop0003: PricesShop0003Entity[];

  @OneToMany(() => PricesShop0004Entity, (shop) => shop.shop_id)
  @JoinColumn({ name: 'shop_id' })
  pricesShop0004: PricesShop0004Entity[];

  @OneToMany(() => PricesShop0005Entity, (shop) => shop.shop_id)
  @JoinColumn({ name: 'shop_id' })
  pricesShop0005: PricesShop0005Entity[];

  @OneToMany(() => PricesShop0006Entity, (shop) => shop.shop_id)
  @JoinColumn({ name: 'shop_id' })
  pricesShop0006: PricesShop0006Entity[];

  @OneToMany(() => PricesShop0007Entity, (shop) => shop.shop_id)
  @JoinColumn({ name: 'shop_id' })
  pricesShop0007: PricesShop0007Entity[];
}
