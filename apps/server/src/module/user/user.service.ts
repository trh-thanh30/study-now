import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private errorMsg = {
    EXIST_USER_EMAIL: 'User with this email already exists',
  };
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        username: createUserDto.username,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        email: updateUserDto.email,
        password: updateUserDto.password,
        username: updateUserDto.username,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findUserByName(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
  async findUserByVerificationEmail(code: string) {
    return await this.prisma.user.findFirst({
      where: {
        verification_code: code,
      },
    });
  }
  async findUserByResetPasswordCode(code: string) {
    return await this.prisma.user.findFirst({
      where: {
        password_reset_code: code,
      },
    });
  }
  async updateRefreshToken(id: string, refreshToken: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
  }
  async updateLastLogin(id: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        last_login_at: new Date(),
      },
    });
  }
}
