import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async validateGoogleLogin(profile: any) {
    const googleId = profile.id;
    const email = profile.emails?.[0]?.value;
    let user = await this.usersRepo.findOne({ where: [{ googleId }, { email }] });

    if (user) {
      user.googleId = user.googleId || googleId;
      user.name = user.name || profile.displayName;
      user.avatar = user.avatar || profile.photos?.[0]?.value;
      await this.usersRepo.save(user);
      return user;
    }

    const newUser = this.usersRepo.create({
      googleId,
      email,
      name: profile.displayName,
      avatar: profile.photos?.[0]?.value,
    });
    return this.usersRepo.save(newUser);
  }

  async generateJwt(user: User) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  async validateUserFromJwt(payload: any) {
    const user = await this.usersRepo.findOne({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
