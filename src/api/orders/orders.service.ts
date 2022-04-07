import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { User } from '../authentications/models/user.entity';
import { Product } from '../products/products.entity';

@Injectable()
export class OrdersService {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  public async createOrder({
    products,
    user,
  }: {
    products: Product[];
    user: User;
  }) {
    const order = new Order();
    order.products = products;
    order.total = products.map((p) => p.price).reduce((cum, a) => cum + a, 0);
    order.user = user;

    return await this.repository.save(order);
  }
}
