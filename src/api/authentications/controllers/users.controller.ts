import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../models/users.dto';
import { UsersService } from '../services/users.service';
import { AuthenticationsService } from '../services/authentications.service';
import { AuthGuardJwt } from '../../../shared/guards/auth.guard';

@Controller('users')
@SerializeOptions({ strategy: 'excludeAll' })
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;
  @Inject(AuthenticationsService)
  private readonly authService: AuthenticationsService;

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuardJwt)
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public async createUser(@Body() body: CreateUserDto): Promise<User> {
    body.password = await this.authService.hashPassword(body.password);
    return this.service.createUser(body);
  }
}
