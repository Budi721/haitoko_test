import {
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuardJwt } from '../../shared/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Put(':id')
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth()
  async updatePaymentStatus(@Param('id', ParseIntPipe) id) {
    return this.service.updatePayment(id);
  }
}
