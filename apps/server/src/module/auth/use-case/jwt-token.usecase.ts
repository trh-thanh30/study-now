import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import tokenConfig from 'src/config/token.config';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { User } from 'src/common/types/user.type';
import { UnauthorizedError } from 'src/common/response/client-errors';

@Injectable()
export class TokenUseCase {
  constructor(
    @Inject(tokenConfig.KEY)
    private readonly config: ConfigType<typeof tokenConfig>,
  ) {}
  private toExpire(value: string | number): SignOptions['expiresIn'] {
    if (typeof value === 'string' && /^\d+$/.test(value)) {
      return Number(value);
    }
    return value as SignOptions['expiresIn'];
  }

  generateTokenPair(payload: User) {
    const access_token = jwt.sign(payload, this.config.access_secret, {
      expiresIn: this.toExpire(this.config.access_expires_in),
      algorithm: 'HS256',
    });

    const refresh_token = jwt.sign(payload, this.config.refresh_secret, {
      expiresIn: this.toExpire(this.config.refresh_expires_in),
    });

    return { access_token, refresh_token };
  }
  verifyAccessToken(access_token: string): JwtPayload {
    try {
      const decoded = jwt.verify(access_token, this.config.access_secret, {
        algorithms: ['HS256'],
      });
      if (typeof decoded === 'string') {
        throw new UnauthorizedError('Invalid or expired refresh token.');
      }

      return decoded;
    } catch {
      throw new UnauthorizedError('Invalid or expired access token.');
    }
  }

  verifyRefreshToken(refresh_token: string): JwtPayload {
    try {
      const decoded = jwt.verify(refresh_token, this.config.refresh_secret, {
        algorithms: ['HS256'],
      });
      if (typeof decoded === 'string') {
        throw new UnauthorizedError('Invalid or expired refresh token.');
      }
      return decoded;
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token.');
    }
  }
}
