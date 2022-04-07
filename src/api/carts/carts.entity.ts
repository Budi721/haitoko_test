import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Product } from '../products/products.entity';
import { User } from '../authentications/models/user.entity';

@Entity()
export class Cart {
  @Expose()
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    nullable: false,
    default: 1,
  })
  public quantity: number;

  @OneToOne(() => User)
  @JoinColumn()
  public user: User;

  @OneToOne(() => Product)
  @JoinColumn()
  public product: Product;
}
