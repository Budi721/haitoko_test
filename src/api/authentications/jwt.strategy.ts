import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationsService } from './services/authentications.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationsService: AuthenticationsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: process.env.AUTH_SECRET,
    });
  }

  public async validate(req, payload, done) {
    const isValid = await this.authenticationsService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized', null);
    } else {
      return done(null, payload);
    }
  }
}
