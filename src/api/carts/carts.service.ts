import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './carts.entity';
import { Repository } from 'typeorm';
import { CreateCart } from './carts.dto';
import { Product } from '../products/products.entity';
import { User } from '../authentications/models/user.entity';

@Injectable()
export class CartsService {
  @InjectRepository(Cart)
  private readonly repository: Repository<Cart>;

  public async createCart(
    body: CreateCart,
    product: Product,
    user: User,
  ): Promise<Cart> {
    const cart = new Cart();
    cart.quantity = body.quantity;
    cart.product = product;
    cart.user = user;
    return this.repository.save(cart);
  }
}
