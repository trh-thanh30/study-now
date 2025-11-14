import { Processor, WorkerHost } from '@nestjs/bullmq';
import { EmailService } from './email.service';
import { Job } from 'bullmq';

@Processor('email')
export class EmailConsumer extends WorkerHost {
  constructor(private readonly mailService: EmailService) {
    super();
  }
  async process(job: Job<any>): Promise<any> {
    const { data } = job;
    console.log('Processing email job', job.name, job.data);
    return this.mailService.sendVerificationEmail(
      data.email,
      data.code,
      data.ttl,
    );
  }
}
