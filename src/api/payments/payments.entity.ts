import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Order } from '../orders/orders.entity';

@Entity()
export class Payment {
  @Expose()
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    nullable: false,
    default: 'unpaid',
  })
  public status: string;

  @OneToOne(() => Order)
  @JoinColumn()
  public order: Order;
}
