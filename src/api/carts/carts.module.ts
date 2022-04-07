import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payments/payments.entity';
import { Cart } from './carts.entity';
import { UsersService } from '../authentications/services/users.service';
import { User } from '../authentications/models/user.entity';
import { Product } from '../products/products.entity';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Product])],
  controllers: [CartsController],
  providers: [CartsService, UsersService, ProductsService],
})
export class CartsModule {}
