import { Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import {
  Attachment,
  CloudListResults,
} from '../../model/generated/entities/Attachment';
import { getManager } from 'typeorm';
import {
  AttachmentService,
  AttachmentServiceKey,
} from '../../model/lib/attachment.service';

@Resolver(() => Attachment)
@UseGuards(GqlAuthGuard)
export class AttachmentResolver {
  constructor(
    @Inject(AttachmentServiceKey)
    protected readonly attachmentService: AttachmentService,
  ) {}

  @Query(() => [Attachment])
  async attachments() {
    return await this.attachmentService.loadEntities(getManager());
  }

  @Query(() => CloudListResults)
  async filesAndFolders() {
    return await this.attachmentService.listCloudContent();
  }
}
