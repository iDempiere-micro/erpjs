import { Controller, Get, Inject } from '@nestjs/common';

import { AppService } from './app.service';
import { MailService, MailServiceKey } from '../model/lib/mail.service';
import {
  AttachmentService,
  AttachmentServiceKey,
} from '../model/lib/attachment.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData() {
    return this.appService.getData();
  }
}
