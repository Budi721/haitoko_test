import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/products.entity';
import { UsersService } from '../authentications/services/users.service';
import { User } from '../authentications/models/user.entity';
import { Payment } from '../payments/payments.entity';
import { PaymentsService } from '../payments/payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User, Payment])],
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService, UsersService, PaymentsService],
})
export class OrdersModule {}
