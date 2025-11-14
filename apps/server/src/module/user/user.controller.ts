import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiSuccess } from 'src/common/decorators/api-response.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiSuccess('Create user successfully', {
    statusCode: 201,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiSuccess('Get all users successfully', {
    statusCode: 200,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiSuccess('Get user info successfully', {
    statusCode: 200,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiSuccess('Update user successfully', {
    statusCode: 200,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiSuccess('Delete user successfully', {
    statusCode: 200,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
