import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Product } from '../products/products.entity';
import { User } from '../authentications/models/user.entity';

@Entity()
export class Order {
  @Expose()
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public total: number;

  @OneToOne(() => User)
  @JoinColumn()
  public user: User;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  public products: Product[];
}
