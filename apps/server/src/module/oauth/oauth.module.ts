import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';

import { PassportModule } from '@nestjs/passport';
import { TokenUseCase } from '../auth/use-case/jwt-token.usecase';
import { GoogleStrategy } from 'src/strategies/google.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  controllers: [OauthController],
  providers: [OauthService, TokenUseCase, GoogleStrategy],
})
export class OauthModule {}
