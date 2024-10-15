import { Entity, Column, OneToMany, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { PricesShop0001Entity } from 'src/prices/prices-shop-0001/prices-shop-0001.entity';
import { PricesShop0002Entity } from 'src/prices/prices-shop-0002/prices-shop-0002.entity';
import { PricesShop0003Entity } from 'src/prices/prices-shop-0003/prices-shop-0003.entity';
import { PricesShop0004Entity } from 'src/prices/prices-shop-0004/prices-shop-0004.entity';
import { PricesShop0005Entity } from 'src/prices/prices-shop-0005/prices-shop-0005.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => PricesShop0001Entity, (product_id) => product_id.product_id)
  @JoinColumn({ name: 'product_id' })
  pricesShop0001: PricesShop0001Entity[];

  @OneToMany(() => PricesShop0002Entity, (product_id) => product_id.product_id)
  @JoinColumn({ name: 'product_id' })
  pricesShop0002: PricesShop0002Entity[];

  @OneToMany(() => PricesShop0003Entity, (product_id) => product_id.product_id)
  @JoinColumn({ name: 'product_id' })
  pricesShop0003: PricesShop0003Entity[];

  @OneToMany(() => PricesShop0004Entity, (product_id) => product_id.product_id)
  @JoinColumn({ name: 'product_id' })
  pricesShop0004: PricesShop0004Entity[];

  @OneToMany(() => PricesShop0005Entity, (product_id) => product_id.product_id)
  @JoinColumn({ name: 'product_id' })
  pricesShop0005: PricesShop0005Entity[];

  @ManyToOne(() => CategoryEntity, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category_id: CategoryEntity;
}
