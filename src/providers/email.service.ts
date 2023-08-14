import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configure your SMTP settings or SendGrid API key here
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text: content,
    });
  }
}