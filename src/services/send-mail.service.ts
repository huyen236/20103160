import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendMailService {
  async sendMail(
    recipient: string,
    subject: string,
    message: string,
  ): Promise<void> {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'appvieclam123@gmail.com', // email dùng để gửi cho người khác. cái này khai báo biến cục bộ để trong config dev
        pass: 'vieclam123@', // Your password   .. cái này khai báo biến cục bộ để trong config dev
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: recipient,
      to: recipient, // thông tin email người nhận
      subject: subject, // tiêu đề
      text: message, // nội dung
    });

    console.log('Email sent successfully');
  }
}
