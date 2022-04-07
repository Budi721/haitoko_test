import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  createToken(email: string, ttl?: number) {
    const expiresIn = ttl || 60 * 60;
    const secret = 'secret';
    const user = { email };
    const token = this.jwtService.sign(user, { expiresIn, secret });
    return {
      expires_in: expiresIn,
      access_token: token,
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
