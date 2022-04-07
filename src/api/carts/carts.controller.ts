import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCart } from './carts.dto';
import { Cart } from './carts.entity';
import { User } from '../authentications/models/user.entity';
import { CurrentUser } from '../authentications/current.user';
import { AuthGuardJwt } from '../../shared/guards/auth.guard';
import { UsersService } from '../authentications/services/users.service';
import { ProductsService } from '../products/products.service';

@Controller('carts')
export class CartsController {
  @Inject(CartsService)
  private readonly service: CartsService;
  @Inject(UsersService)
  private readonly usersService: UsersService;
  @Inject(ProductsService)
  private readonly productsService: ProductsService;

  @Post()
  @UseGuards(AuthGuardJwt)
  public async postCart(
    @Body() body: CreateCart,
    @CurrentUser() user: CurrentUser,
  ): Promise<Cart> {
    const product = await this.productsService.getProductById(body.productId);
    const loggedUser = await this.usersService.getUserByEmail(user.email);
    return this.service.createCart(body, product, loggedUser);
  }
}
