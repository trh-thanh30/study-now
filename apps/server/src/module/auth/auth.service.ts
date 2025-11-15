import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from 'src/common/response/client-errors';
import { comparePassword, hashPassword } from 'src/common/utils/bcrypt.util';
import { VerificationCodeService } from 'src/common/utils/verifi-code.util';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { LoginDto } from './dto/login.dto';
import { RequestEmailDto } from './dto/request-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User, user_status } from '@prisma/client';
import { TokenUseCase } from './use-case/jwt-token.usecase';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('email')
    private readonly mailQueue: Queue,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly verifiCoderService: VerificationCodeService,
    private readonly tokenUseCase: TokenUseCase,
  ) {}
  private readonly errMsg = {
    EXIST_USER_EMAIL: 'User with this email already exists',
    EXIST_USER_USERNAME: 'User with this username already exists',
    NOT_FOUND_USER: 'User not found',
    INCORRECT_PASSWORD: 'Invalid credentials',
    INCORRECT_VERIFICATION_CODE: 'Incorrect verification code',
    EXPIRED_VERIFICATION_CODE: 'Expired verification code',
    EXPIRED_PASSWORD_RESET_CODE: 'Expired password reset code',
    INCORRECT_PASSWORD_RESET_CODE: 'Incorrect password reset code',
    PASSWORD_DOES_NOT_MATCH: 'Passwords do not match',
    USER_ALREADY_VERIFIED: 'User already verified',
    USER_NOT_VERIFIED: 'User not verified',
    USER_NOT_ACTIVE: 'User not active',
  };
  /**
   * Registers a new user with the given credentials.
   * Checks if a user with the same email or username already exists.
   * Hashes the password.
   * Generates a verification code and sends it to the user's email.
   * Creates a new user with the given credentials and the generated verification code.
   * @returns the created user object.
   * @throws ConflictError if a user with the same email or username already exists.
   */
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

  /**
   * Verifies a user's email address using the given verification code.
   * Checks if the user with the given verification code exists.
   * Checks if the verification code is correct.
   * Checks if the verification code has expired.
   * Updates the user's verification code and expiration time to null.
   * Updates the user's is_verified field to true.
   * @returns the verified user object.
   * @throws ValidationError if the verification code is incorrect or has expired.
   */
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

  /**
   * Sends a reset password email to the user with the given email address.
   * Checks if the user with the given email address exists.
   * Generates a new password reset code and expiration time.
   * Adds a job to the mail queue to send the reset password email.
   * Updates the user's password reset code and expiration time.
   * @returns the updated user object.
   * @throws NotFoundError if the user with the given email address does not exist.
   */
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

  /**
   * Resets a user's password.
   * Checks if the user with the given password reset code exists.
   * Checks if the given password reset code is correct.
   * Checks if the password reset code has expired.
   * Checks if the given new password and confirm new password match.
   * Hashes the new password.
   * Updates the user's password and password reset code and expiration time to null.
   * @returns the updated user object.
   * @throws NotFoundError if the user with the given password reset code does not exist.
   * @throws ValidationError if the password reset code is incorrect or has expired or if the new password and confirm new password do not match.
   */
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

  /**
   * Logs in a user with the given credentials.
   * Checks if the user with the given email exists.
   * Checks if the given password matches the user's password.
   * Checks if the user is verified.
   * Checks if the user is active.
   * Generates a token pair for the user.
   * Updates the user's refresh token to the generated refresh token.
   * @returns the generated access token, refresh token and user id.
   * @throws NotFoundError if the user with the given email does not exist.
   * @throws ValidationError if the given password does not match the user's password or if the user is not verified or not active.
   */
  async login(dto: LoginDto) {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) {
      throw new NotFoundError(this.errMsg.NOT_FOUND_USER);
    }
    const isPasswordMatch = await comparePassword(
      dto.password,
      user?.password as string,
    );
    if (!isPasswordMatch) {
      throw new ValidationError(this.errMsg.INCORRECT_PASSWORD);
    }
    // validate
    this.validateUserCanLogin(user);
    const { access_token, refresh_token } = this.tokenUseCase.generateTokenPair(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    );
    await this.userService.updateRefreshToken(user.id, refresh_token);
    return {
      access_token,
      refresh_token,
      id: user.id,
    };
  }

  private validateUserCanLogin(user: User) {
    if (!user.is_verified) {
      throw new ValidationError(this.errMsg.USER_NOT_VERIFIED);
    }
    if (user.status !== user_status.ACTIVE) {
      throw new ValidationError(this.errMsg.USER_NOT_ACTIVE);
    }
  }
}
