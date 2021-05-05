import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EventLogService, EventLogServiceKey } from './eventLog.service';
import { getManager } from 'typeorm';
import { getTechnicalUser } from './user.service';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

export const MailServiceKey = 'MailServiceKey';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(EventLogServiceKey)
    private readonly eventLogService: EventLogService,
  ) {}

  async sendTest(
    to: Address,
    bcc: Address,
    subject: string,
    text: string,
    html: string,
    replyTo: string,
  ) {
    const manager = getManager();
    try {
      await this.mailerService.sendMail({
        // list of receivers
        to,
        bcc,
        // sender address
        from: process.env.MAIL_USER,
        subject, // Subject line
        text,
        html,
        replyTo,
      });
    } catch (exception) {
      await this.eventLogService.save(
        manager,
        {
          displayName: 'email sending failed',
          content: { exception },
        },
        await getTechnicalUser(manager),
      );
    }
  }
}
