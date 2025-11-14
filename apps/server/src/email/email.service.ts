/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import * as nodemailer from 'nodemailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { emailConfig } from 'src/config';
import type { ConfigType } from '@nestjs/config';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: nodemailer.Transporter;
  constructor(
    @Inject(emailConfig.KEY)
    private readonly config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.config.smtpHost,
      port: this.config.smtpPort,
      secure: false, // true nếu port 465, false nếu 587
      auth: {
        user: this.config.smtpUser,
        pass: this.config.smtpPass,
      },
    });
    console.log('transporter', this.config);

    this.transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      }
      if (success) {
        console.log('Server is ready to take our messages');
      }
    });
  }

  private renderTemplate(template: string, context: any) {
    const templatePath = path.join(
      process.cwd(),
      '/src/common/templates',
      `${template}.hbs`,
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const templateCompiled = Handlebars.compile(templateSource);
    return templateCompiled(context);
  }
  async sendEmail(to: string, subject: string, text: string, hbs?: string) {
    try {
      this.logger.log(
        `Sending email to ${to} with subject ${subject} from ${this.config.smtpFrom}`,
      );
      await this.transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${this.config.smtpFrom}>`,
        to,
        subject,
        text,
        html: hbs,
      });
      this.logger.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (error) {
      this.logger.error(` Failed to send email to ${to}: ${error.message}`);
      throw error;
    }
  }
  async sendVerificationEmail(email: string, code: string, ttl: Date) {
    try {
      const html = this.renderTemplate('verify-email', { code, ttl });
      console.log(html);
      console.log('email', email);
      await this.sendEmail(email, 'Verify your email', '', html);
    } catch (err) {
      console.error('Error in sendVerificationEmail:', err);
    }
  }
}
