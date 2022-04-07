import { Controller, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../authentications/current.user';

@Controller('orders')
export class OrdersController {
  @Inject(OrdersService)
  private readonly service: OrdersService;

  public postOrder(@CurrentUser() user: CurrentUser) {
    // TODO: Cari product bds user id
    // TODO: buat di service insert ke product order
    // TODO: insert ke order totalnya
    // TODO: insert ke payment status belum dibayar
    // return this.service.createOrder()
  }
}
