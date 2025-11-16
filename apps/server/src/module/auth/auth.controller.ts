import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiSuccess } from 'src/common/decorators/api-response.decorator';
import { RequestEmailDto } from './dto/request-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { LoginDto } from './dto/login.dto';
import { cookieConfig } from 'src/config';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UnauthorizedError } from 'src/common/response/client-errors';
import type { ConfigType } from '@nestjs/config';
import type { User as UserType } from 'src/common/types/user.type';
import express from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(cookieConfig.KEY)
    private readonly cookieCfg: ConfigType<typeof cookieConfig>,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  @ApiSuccess(
    'User registered successfully. Please check your email to verify your account.',
  )
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @ApiSuccess('User logged in successfully')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const result = await this.authService.login(dto);
    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: Boolean(this.cookieCfg.httpOnly),
      sameSite: this.cookieCfg.sameSite as 'lax' | 'strict' | 'none' | boolean,
      domain: this.cookieCfg.domain || undefined,
      maxAge: Number(this.cookieCfg.maxAge),
      secure: Boolean(this.cookieCfg.secure),
    });
    return result;
  }

  @Public()
  @Post('verify-email')
  @ApiSuccess('Email verified successfully')
  verifyEmail(@Body('verificationCode') verificationCode: string) {
    return this.authService.verifyEmail(verificationCode);
  }

  @Public()
  @Post('forgot-password')
  @ApiSuccess('Password reset code sent successfully. Please check your email.')
  forgotPassword(@Body() dto: RequestEmailDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('reset-password')
  @ApiSuccess('Password reset successfully')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  /**
   * Resends a verification email to the given email address.
   * Checks if the user with the given email address exists.
   * Checks if the user with the given email address has already been verified.
   * Generates a new verification code and expiration time.
   * Adds a job to the mail queue to send the verification email.
   * Updates the user's verification code and expiration time.
   * @returns the updated user object.
   * @throws NotFoundError if the user with the given email address does not exist.
   * @throws ValidationError if the user with the given email address has already been verified.
   */
  @Public()
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 1, ttl: 60 } })
  @Post('resend-verification')
  @ApiSuccess('Verification code sent successfully. Please check your email.')
  resendVerificationEmail(@Body('email') email: string) {
    return this.authService.resendVerificationEmail(email);
  }

  @Public()
  @Post('refresh-token')
  /**
   * Refreshes a user's access token using the given refresh token.
   * Checks if the refresh token is present in the cookie.
   * Checks if the refresh token is valid.
   * Updates the user's access token and refresh token.
   * Returns the updated user object.
   * @throws UnauthorizedError if the refresh token is not found in the cookie or is invalid.
   */
  async refreshToken(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const refreshTokenInCookie = req.cookies?.refresh_token as string;
    if (!refreshTokenInCookie) {
      throw new UnauthorizedError('Refresh token not found in cookie');
    }

    try {
      const result = await this.authService.refreshToken(refreshTokenInCookie);
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
      });
      return result;
    } catch {
      res.clearCookie('refresh_token');
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  @Get('profile')
  @ApiSuccess('User profile')
  profile(@User() user: UserType) {
    return this.authService.profile(user.id);
  }
  @Post('logout')
  @ApiSuccess('User logged out successfully')
  logout(
    @Res({ passthrough: true }) res: express.Response,
    @User() user: UserType,
  ) {
    res.clearCookie('refresh_token');
    return this.authService.logout(user.id);
  }
}
