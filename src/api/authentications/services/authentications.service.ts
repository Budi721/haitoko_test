import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from '../models/authentications.entity';
import { Repository } from 'typeorm';

const expiresIn = 1800;
const expiresInRefresh = -1;
const secret = process.env.ACCESS_TOKEN_KEY;
const secretRefresh = process.env.REFRESH_TOKEN_KEY;

@Injectable()
export class AuthenticationsService {
  constructor(
    @InjectRepository(Authentication)
    private readonly repository: Repository<Authentication>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async createToken(email: string) {
    const user = { email };
    const token = this.jwtService.sign(user, { expiresIn, secret });
    const refreshToken = this.jwtService.sign(user, {
      expiresIn: expiresInRefresh,
      secret: secretRefresh,
    });
    await this.repository.save({ token: refreshToken });

    return {
      expires_in: expiresIn,
      access_token: token,
      refresh_token: refreshToken,
    };
  }

  async generateFromRefreshToken(token: string) {
    const isPersist = await this.repository.findOne({
      where: { token },
    });

    if (!isPersist) {
      throw new NotFoundException('refresh token not available');
    }

    const payload = await this.jwtService.decode(token);
    const user = { email: payload['email'] };
    const newToken = this.jwtService.sign(user, { expiresIn, secret });
    const refreshToken = this.jwtService.sign(user, {
      expiresIn: expiresInRefresh,
      secret: secretRefresh,
    });

    return {
      expires_in: expiresIn,
      access_token: newToken,
      refresh_token: refreshToken,
    };
  }

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(payload.email);
    return !!user;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
