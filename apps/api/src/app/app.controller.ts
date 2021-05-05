import { Controller, Get, Inject } from '@nestjs/common';

import { AppService } from './app.service';
import { MailService, MailServiceKey } from '../model/lib/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(MailServiceKey) private readonly mailService: MailService,
  ) {}

  @Get()
  getData() {
    this.mailService.sendTestEmail();
    return this.appService.getData();
  }
}
