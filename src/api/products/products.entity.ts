import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Order } from '../orders/orders.entity';

@Entity()
export class Product {
  @Expose()
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @ManyToMany(() => Order)
  @JoinTable()
  public orders: Order[];
}
