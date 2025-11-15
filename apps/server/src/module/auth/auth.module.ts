import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { VerificationCodeService } from 'src/common/utils/verifi-code.util';
import { EmailModule } from 'src/email/email.module';
import { TokenUseCase } from './use-case/jwt-token.usecase';

@Module({
  imports: [UserModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, VerificationCodeService, TokenUseCase],
})
export class AuthModule {}
