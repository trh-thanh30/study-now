/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { EmailService } from './email.service';
import { Job } from 'bullmq';

@Processor('email')
export class EmailConsumer extends WorkerHost {
  constructor(private readonly mailService: EmailService) {
    super();
  }
  async process(job: Job<any>): Promise<any> {
    const { data, name } = job;
    console.log('Processing email job', job.name, job.data);
    if (name === 'sendVerificationEmail') {
      return this.mailService.sendVerificationEmail(
        data.email,
        data.code,
        data.ttl,
      );
    }
    if (name === 'sendResetPasswordEmail') {
      return this.mailService.sendResetPasswordEmail(
        data.email,
        data.code,
        data.ttl,
      );
    }
  }
}
