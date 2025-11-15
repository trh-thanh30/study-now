import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from 'src/common/response/client-errors';
import { hashPassword } from 'src/common/utils/bcrypt.util';
import { VerificationCodeService } from 'src/common/utils/verifi-code.util';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { LoginDto } from './dto/login.dto';
import { RequestEmailDto } from './dto/request-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('email')
    private readonly mailQueue: Queue,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly verifiCoderService: VerificationCodeService,
  ) {}
  private readonly errMsg = {
    EXIST_USER_EMAIL: 'User with this email already exists',
    EXIST_USER_USERNAME: 'User with this username already exists',
    NOT_FOUND_USER: 'User not found',
    INCORRECT_PASSWORD: 'Incorrect password',
    INCORRECT_VERIFICATION_CODE: 'Incorrect verification code',
    EXPIRED_VERIFICATION_CODE: 'Expired verification code',
    EXPIRED_PASSWORD_RESET_CODE: 'Expired password reset code',
    INCORRECT_PASSWORD_RESET_CODE: 'Incorrect password reset code',
    PASSWORD_DOES_NOT_MATCH: 'Passwords do not match',
    USER_ALREADY_VERIFIED: 'User already verified',
  };
  async register(dto: RegisterDto) {
    const exitingEmail = await this.userService.findUserByEmail(dto.email);

    if (exitingEmail) {
      throw new ConflictError(this.errMsg.EXIST_USER_EMAIL);
    }
    const exitingUsername = await this.userService.findUserByName(dto.username);
    if (exitingUsername) {
      throw new ConflictError(this.errMsg.EXIST_USER_USERNAME);
    }

    // hash password
    const hashedPassword = await hashPassword(dto.password);
    // create verification code
    const { code, expiredAt } =
      this.verifiCoderService.generate6DigitCodeWithExpiredAt({
        ttl: 5,
        length: 6,
      });
    // send email
    await this.mailQueue.add('sendVerificationEmail', {
      email: dto.email,
      code,
      ttl: expiredAt,
    });

    // create user
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        verification_code: code,
        verification_code_expired: expiredAt,
      },
    });

    return {
      id: user.id,
      email: dto.email,
      username: dto.username,
    };
  }

  // verify email
  async verifyEmail(verificationCode: string) {
    const user =
      await this.userService.findUserByVerificationEmail(verificationCode);
    if (user?.verification_code !== verificationCode) {
      throw new ValidationError(this.errMsg.INCORRECT_VERIFICATION_CODE);
    }
    if (
      !user?.verification_code_expired ||
      this.verifiCoderService.isCodeExpired(user.verification_code_expired)
    ) {
      throw new ValidationError(this.errMsg.EXPIRED_VERIFICATION_CODE);
    }
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verification_code: null,
        verification_code_expired: null,
        is_verified: true,
      },
    });
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
  async resendVerificationEmail(email: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new NotFoundError(this.errMsg.NOT_FOUND_USER);
    // if (user.is_verified === true)
    //   throw new ValidationError(this.errMsg.USER_ALREADY_VERIFIED);
    const { code, expiredAt } =
      this.verifiCoderService.generate6DigitCodeWithExpiredAt({
        ttl: 5,
        length: 6,
      });
    await this.mailQueue.add('sendVerificationEmail', {
      email,
      code,
      ttl: expiredAt,
    });
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verification_code: code,
        verification_code_expired: expiredAt,
      },
    });
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
  async forgotPassword(dto: RequestEmailDto) {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) throw new NotFoundError(this.errMsg.NOT_FOUND_USER);
    const { code, expiredAt } =
      this.verifiCoderService.generate6DigitCodeWithExpiredAt({
        ttl: 5,
        length: 6,
      });
    await this.mailQueue.add('sendResetPasswordEmail', {
      email: dto.email,
      code,
      ttl: expiredAt,
    });
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password_reset_code: code,
        password_reset_code_expired: expiredAt,
      },
    });
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.userService.findUserByResetPasswordCode(dto.code);
    if (!user) throw new NotFoundError(this.errMsg.NOT_FOUND_USER);
    if (dto.confirmNewPassword !== dto.newPassword)
      throw new ValidationError(this.errMsg.PASSWORD_DOES_NOT_MATCH);
    if (dto.code !== user.password_reset_code)
      throw new ValidationError(this.errMsg.INCORRECT_PASSWORD_RESET_CODE);
    if (
      !user.password_reset_code_expired ||
      this.verifiCoderService.isCodeExpired(user.password_reset_code_expired)
    ) {
      throw new ValidationError(this.errMsg.EXPIRED_PASSWORD_RESET_CODE);
    }
    const hashedPassword = await hashPassword(dto.newPassword);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        password_reset_code: null,
        password_reset_code_expired: null,
      },
    });
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
  // login
  async login(dto: LoginDto) {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) {
      throw new NotFoundError(this.errMsg.NOT_FOUND_USER);
    }
  }
}
