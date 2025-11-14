import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailService } from './email.service';
import { EmailConsumer } from './email.consumer';
import { EmailController } from './emai.controller';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailConsumer],
  exports: [EmailService, BullModule],
})
export class EmailModule {}
