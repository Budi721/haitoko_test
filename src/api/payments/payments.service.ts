import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payments.entity';
import { InsertResult, Repository } from 'typeorm';
import { Order } from '../orders/orders.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async createInitialPayment(order: Order): Promise<InsertResult> {
    const payment = new Payment();
    payment.order = order;
    return this.repository.insert(payment);
  }

  async updatePayment(id: number) {
    const payment = await this.repository.findOne(id);
    payment.status = 'paid';
    return this.repository.save(payment);
  }
}
