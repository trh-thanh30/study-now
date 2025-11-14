import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiSuccess } from 'src/common/decorators/api-response.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiSuccess('User registered successfully')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
