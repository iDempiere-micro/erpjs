import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EventLogService, EventLogServiceKey } from './eventLog.service';
import { EntityManager } from 'typeorm';
import { getTechnicalUser } from './user.service';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { ConfigService, ConfigServiceKey } from './config.service';
import { ConfigData } from './config.model';
import { InjectEntityManager } from '@nestjs/typeorm';

export const MailServiceKey = 'MailServiceKey';

export interface MailConfiguration extends ConfigData {
  __typeName: 'MailConfiguration';
  from: string;
}

export interface MailAttachment {
  filename: string;
  /**
   * This can be Buffer or Stream directly. If it is a base64 string returned from S3,
   * you must also include `encoding: 'base64'`
   */
  content?: any;
  encoding?: string;
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(EventLogServiceKey)
    private readonly eventLogService: EventLogService,
    @Inject(ConfigServiceKey)
    private readonly configService: ConfigService<MailConfiguration>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async senderEmail() {
    return (
      (
        await this.configService.loadEntity(this.entityManager, {
          where: { displayName: 'MailConfiguration' },
        })
      )?.content?.from || process.env.MAIL_USER
    );
  }

  async send(
    to: Address,
    bcc: Address,
    subject: string,
    text: string,
    html: string,
    replyTo: string,
    attachments: MailAttachment[] | undefined,
  ) {
    const manager = this.entityManager;
    try {
      await this.mailerService.sendMail({
        // list of receivers
        to,
        bcc,
        // sender address
        from: await this.senderEmail(),
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
