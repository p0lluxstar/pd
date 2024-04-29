import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: 'shops'})
export class Shop {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
