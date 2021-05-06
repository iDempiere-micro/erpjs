import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EventLogService, EventLogServiceKey } from './eventLog.service';
import { getManager } from 'typeorm';
import { getTechnicalUser } from './user.service';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { ConfigService, ConfigServiceKey } from './config.service';
import { ConfigData } from './config.model';

export const MailServiceKey = 'MailServiceKey';

export interface MailConfiguration extends ConfigData {
  __typeName: 'MailConfiguration';
  from: string;
}

export interface MailAttachment {
  filename: string;
  content?: any;
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(EventLogServiceKey)
    private readonly eventLogService: EventLogService,
    @Inject(ConfigServiceKey)
    private readonly configService: ConfigService<MailConfiguration>,
  ) {}

  async send(
    to: Address,
    bcc: Address,
    subject: string,
    text: string,
    html: string,
    replyTo: string,
    attachments: MailAttachment[] | undefined,
  ) {
    const manager = getManager();
    try {
      await this.mailerService.sendMail({
        // list of receivers
        to,
        bcc,
        // sender address
        from:
          (
            await this.configService.loadEntity(manager, {
              where: { displayName: 'MailConfiguration' },
            })
          )?.content?.from || process.env.MAIL_USER,
        subject, // Subject line
        text,
        html,
        replyTo,
        attachments,
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
