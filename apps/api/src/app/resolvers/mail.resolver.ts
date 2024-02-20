import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth';
import { MailService, MailServiceKey } from '../../model/lib/mail.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class MailResolver {
  constructor(
    @Inject(MailServiceKey) protected readonly mailService: MailService,
  ) {}

  @Query(() => String)
  async mailSentFrom() {
    return this.mailService.senderEmail();
  }
}
