import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiSuccess } from 'src/common/decorators/api-response.decorator';
import { RequestEmailDto } from './dto/request-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { LoginDto } from './dto/login.dto';
import express from 'express';
import { cookieConfig } from 'src/config';
import type { ConfigType } from '@nestjs/config';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(cookieConfig.KEY)
    private readonly cookieCfg: ConfigType<typeof cookieConfig>,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiSuccess(
    'User registered successfully. Please check your email to verify your account.',
  )
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

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

  @Post('verify-email')
  @ApiSuccess('Email verified successfully')
  verifyEmail(@Body('verificationCode') verificationCode: string) {
    return this.authService.verifyEmail(verificationCode);
  }

  @Post('forgot-password')
  @ApiSuccess('Password reset code sent successfully. Please check your email.')
  forgotPassword(@Body() dto: RequestEmailDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @ApiSuccess('Password reset successfully')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 1, ttl: 60 } })
  @Post('resend-verification')
  @ApiSuccess('Verification code sent successfully. Please check your email.')
  resendVerificationEmail(@Body('email') email: string) {
    return this.authService.resendVerificationEmail(email);
  }
}
