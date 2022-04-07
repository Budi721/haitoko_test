import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProduct } from './products.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  @Inject(ProductsService)
  private readonly service: ProductsService;

  @Post()
  public async postProduct(@Body() body: CreateProduct): Promise<Product> {
    return this.service.createProduct(body);
  }
}
