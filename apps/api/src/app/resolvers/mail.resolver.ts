import { Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import { MailService, MailServiceKey } from '../../model/lib/mail.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class MailResolver {
  constructor(
    @Inject(MailServiceKey) protected readonly mailService: MailService
  ) {
  }

  @Query(() => String)
  async mailSentFrom() {
    return this.mailService.senderEmail();
  }
}
