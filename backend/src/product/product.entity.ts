import { Entity, Column, OneToMany, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { PricesShop0001Entity } from 'src/prices/prices-shop-0001/prices-shop-0001.entity';
import { PricesShop0002 } from 'src/prices/prices-shop-0002.entity';
import { PricesShop0003 } from 'src/prices/prices-shop-0003.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => PricesShop0001Entity, (product_id) => product_id.product_id)
  @JoinColumn({ name: 'product_id' })
  pricesShop0001: PricesShop0001Entity[];

  @OneToMany(() => PricesShop0002, (product_id) => product_id.product_id)
  @JoinColumn({ name: 'product_id' })
  pricesShop0002: PricesShop0002[];

  @OneToMany(() => PricesShop0003, (product_id) => product_id.product_id)
  @JoinColumn({ name: 'product_id' })
  pricesShop0003: PricesShop0003[];

  @ManyToOne(() => CategoryEntity, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category_id: CategoryEntity;
}
