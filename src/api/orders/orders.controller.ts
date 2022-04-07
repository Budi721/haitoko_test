import {
  BadGatewayException,
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../authentications/current.user';
import { CreateOrder } from './orders.dto';
import { UsersService } from '../authentications/services/users.service';
import { ProductsService } from '../products/products.service';
import { AuthGuardJwt } from '../../shared/guards/auth.guard';
import { PaymentsService } from '../payments/payments.service';
import { Order } from './orders.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly service: OrdersService,
    private readonly productService: ProductsService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post()
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth()
  public async postOrder(
    @CurrentUser() user: CurrentUser,
    @Body() body: CreateOrder,
  ) {
    try {
      const loggedUser = await this.usersService.getUserByEmail(user.email);
      const products = await this.productService.getSomeProductById(
        body.productsId,
      );

      const createdOrder = await this.service.createOrder({
        user: loggedUser,
        products: products,
      });
      await this.paymentsService.createInitialPayment(createdOrder);
      return createdOrder.id;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
