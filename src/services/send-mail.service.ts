import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendMailService {
  async sendMail(
    recipient: string,
    subject: string,
    message: string,
  ): Promise<void> {
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'appvieclam123@gmail.com',
        pass: 'uswz kqia pqnv swtx', 
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: recipient,
      to: recipient, 
      subject: subject, 
      text: message, 
    });

    console.log('Email sent successfully');
  }
}
