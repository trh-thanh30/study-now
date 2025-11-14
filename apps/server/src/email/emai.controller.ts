import { Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly email: EmailService) {}
  @Post('send')
  async send() {
    await this.email.sendEmail(
      'tranhuuthanhcp@gmail.com',
      'Verify your email',
      'test',
    );
  }
}
