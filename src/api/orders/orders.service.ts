import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { User } from '../authentications/models/user.entity';

@Injectable()
export class OrdersService {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  public createOrder({ total, user }: { total: number; user: User }) {
    const order = new Order();
    order.user = user;
    order.total = total;
    return this.repository.save(order);
  }
}
