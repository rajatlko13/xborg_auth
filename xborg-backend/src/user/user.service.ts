import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  // findByGoogleId(googleId: string) {
  //   return this.usersRepo.findOne({ where: { googleId } });
  // }

  // findByEmail(email: string) {
  //   return this.usersRepo.findOne({ where: { email } });
  // }

  // async findOrCreateFromGoogle(profile: any) {
  //   const googleId = profile.id;
  //   const email = profile.emails?.[0]?.value;
  //   let user = await this.findByGoogleId(googleId);
  //   if (!user && email) {
  //     user = await this.findByEmail(email);
  //   }

  //   if (user) {
  //     user.googleId = user.googleId || googleId;
  //     user.name = profile.displayName || user.name;
  //     user.avatar = profile.photos?.[0]?.value || user.avatar;
  //     user.email = user.email || email;
  //     return this.usersRepo.save(user);
  //   }

  //   const newUser = this.usersRepo.create({
  //     googleId,
  //     email,
  //     name: profile.displayName,
  //     avatar: profile.photos?.[0]?.value,
  //   });
  //   return this.usersRepo.save(newUser);
  // }

  async updateProfile(id: string, patch: Partial<User>) {
    await this.usersRepo.update(id, patch);
    return this.findById(id);
  }
}
