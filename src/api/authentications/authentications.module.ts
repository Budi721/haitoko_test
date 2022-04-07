import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { AuthenticationsService } from './services/authentications.service';
import { Authentication } from './models/authentications.entity';
import { User } from './models/user.entity';
import { UsersController } from './controllers/users.controller';
import { AuthenticationsController } from './controllers/authentications.controller';
import JwtStrategy from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authentication, User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.ACCESS_TOKEN_KEY,
        signOptions: {
          expiresIn: '30m',
        },
      }),
    }),
  ],
  controllers: [AuthenticationsController, UsersController],
  providers: [AuthenticationsService, UsersService, JwtStrategy],
})
export class AuthenticationsModule {}
