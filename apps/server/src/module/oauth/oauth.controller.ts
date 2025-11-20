import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, type Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { GoogleProfile } from 'src/common/types/google-profile.type';
import { cookieConfig } from 'src/config';
import type { ConfigType } from '@nestjs/config';

@Controller('auth')
export class OauthController {
  constructor(
    private readonly oauthService: OauthService,
    @Inject(cookieConfig.KEY)
    private readonly cookieCfg: ConfigType<typeof cookieConfig>,
  ) {}
  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  googleAuth() {
    // This is automatically handled by Passport
  }
  /**
   * This endpoint is used to handle the callback from the Google OAuth 2.0 API.
   * It is called after the user has authorized the application to access their Google account.
   * It redirects the user to the frontend URL with the access token as a query parameter.
   * @param req The request object.
   * @param res The response object.
   */
  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleAuthCallback(
    @Req()
    req: Request & {
      user: GoogleProfile & { accessToken: string; refreshToken: string };
    },
    @Res() res: Response,
  ) {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
      const result = await this.oauthService.validateGoogleUser(req.user);
      res.cookie('refresh_token', result.refresh_token, {
        httpOnly: Boolean(this.cookieCfg.httpOnly),
        sameSite: this.cookieCfg.sameSite as
          | 'lax'
          | 'strict'
          | 'none'
          | boolean,
        domain: this.cookieCfg.domain || undefined,
        maxAge: Number(this.cookieCfg.maxAge),
        secure: Boolean(this.cookieCfg.secure),
        path: this.cookieCfg.path,
      });
      res.redirect(
        `${frontendUrl}/auth/callback?accessToken=${result.access_token}&refreshToken=${result.refresh_token}`,
      );
      return result;
    } catch (error) {
      console.log('Error in Google OAuth callback:', error);
    }
  }
}
