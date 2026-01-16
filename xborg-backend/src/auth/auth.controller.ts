import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

/**
 * Authentication controller handling OAuth2 Google login flow and session management.
 * 
 * Provides endpoints for:
 * - Initiating Google OAuth2 authentication
 * - Handling Google OAuth2 callback and JWT token generation
 * - User logout and session termination
 * 
 * All endpoints that require authentication are protected by the Google AuthGuard.
 * JWT tokens are stored in httpOnly, secure cookies with a 7-day expiration.
 * 
 * @class AuthController
*/
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // initiates the Google OAuth2 login flow
  }

  @Get('validate/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    // Google redirects here after successful login; req.user is set
    const token = await this.authService.generateJwt(req.user);
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    res.cookie('token', token, cookieOptions);
    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectTo = `${frontend.replace(/\/$/, '')}/auth/callback`;
    return res.redirect(redirectTo);
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';
    return res.redirect(frontend);
  }
}
