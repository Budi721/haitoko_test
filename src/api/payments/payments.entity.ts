import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Order } from '../orders/orders.entity';

@Entity()
export class Payment {
  @Expose()
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public status: string;

  @OneToOne(() => Order)
  public order: Order;
}
