import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private users: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req: any) {
    const user = await this.users.findById(req.user.id);
    return { user };
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Req() req: any, @Body() body: any) {
    const updated = await this.users.updateProfile(req.user.id, body);
    return { user: updated };
  }
}
