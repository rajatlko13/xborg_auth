import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as JwtStrategyBase, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

const cookieExtractor = (req: any) => {
  if (!req) return null;
  if (req.cookies && req.cookies.token) return req.cookies.token;
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev_secret',
    });
  }

  async validate(payload: any) {
    return this.authService.validateUserFromJwt(payload);
  }
}
