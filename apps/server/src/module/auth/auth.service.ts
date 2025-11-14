import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { NotFoundError } from 'src/common/response/client-errors';
import { hashPassword } from 'src/common/utils/bcrypt.util';
import { VerificationCodeService } from 'src/common/utils/verifi-code.util';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

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
  };
  async register(dto: RegisterDto) {
    const exitingEmail = await this.userService.findUserByEmail(dto.email);
    if (exitingEmail) {
      throw new NotFoundError(this.errMsg.EXIST_USER_EMAIL);
    }
    const exitingUsername = await this.userService.findUserByName(dto.username);
    if (exitingUsername) {
      throw new NotFoundError(this.errMsg.EXIST_USER_EMAIL);
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
    const res = await this.mailQueue.add('sendVerificationEmail', {
      email: dto.email,
      code,
      ttl: expiredAt,
    });
    console.log('res', res);
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
}
