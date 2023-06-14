import config from '../config';
import nodemailer from 'nodemailer';
import path from 'path';
import logger from '../middlewares/logger';

class Email {
  private owner;
  private transporter;

  constructor() {
    this.owner = {
      name: 'danielperco',
      address: 'danielperco4@gmail.com',
    };

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'danielperco4@gmail.com',
        pass: 'Qadf0502',
      },
    });

    this.transporter.verify().then(() => logger.info('READY To Send Email'));
  }

  async sendEmail(dest: string, subject: string, content: string) {
    const mailOptions: any = {
      from: this.owner,
      to: dest,
      subject,
      html: content,
      attachments: [
        {
          // filename and content type is derived from path
          path: path.resolve(__dirname, '../../ecommerce.jpeg'),
        },
      ],
    };

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}

export const EmailService = new Email();
