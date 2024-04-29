import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { PricesShop0001 } from 'src/prices/prices-shop-0001.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => PricesShop0001, (product_id) => product_id.product_id)
  product_id: PricesShop0001[];
}
