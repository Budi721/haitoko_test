import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProduct } from './products.dto';

@Injectable()
export class ProductsService {
  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  public createProduct(body: CreateProduct): Promise<Product> {
    const product = new Product();
    product.name = body.name;
    product.price = body.price;
    return this.repository.save(product);
  }

  public getProductById(id: number): Promise<Product> {
    return this.repository.findOne(id);
  }
}
