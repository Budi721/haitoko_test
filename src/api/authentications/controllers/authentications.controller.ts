import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../services/users.service';
import { LoginBody, RequestToken } from '../models/authentications.dto';
import { AuthenticationsService } from '../services/authentications.service';

@Controller('auth')
export class AuthenticationsController {
  constructor(
    private readonly authenticationService: AuthenticationsService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body: LoginBody, @Res() res): Promise<any> {
    const user = await this.userService.getUserByEmail(body.email);
    if (!user) {
      throw new NotFoundException('user dan password not found');
    }

    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException('invalid credential for user');
    }

    const result = await this.authenticationService.createToken(user.email);
    return res.json(result);
  }

  @Put('refresh-token')
  public async refreshToken(@Body() body: RequestToken, @Res() res) {
    const result = await this.authenticationService.generateFromRefreshToken(
      body.refreshToken,
    );
    return res.json(result);
  }
}
