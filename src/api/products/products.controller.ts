import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateProduct } from './products.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuardJwt } from '../../shared/guards/auth.guard';

@Controller('products')
export class ProductsController {
  @Inject(ProductsService)
  private readonly service: ProductsService;

  @Post()
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth()
  public async postProduct(@Body() body: CreateProduct): Promise<Product> {
    return this.service.createProduct(body);
  }
}
