import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Attachment } from '../../model/generated/entities/Attachment';
import { getManager } from 'typeorm';
import {
  AttachmentService,
  AttachmentServiceKey,
} from '../../model/lib/attachment.service';
import { AttachmentSaveArgs } from '../saveArgs/attachment.save.args';
import { AttachmentModel } from '../../model/lib/attachment.model';

@Resolver(() => Attachment)
@UseGuards(GqlAuthGuard)
export class AttachmentResolver {
  constructor(
    @Inject(AttachmentServiceKey)
    protected readonly attachmentService: AttachmentService,
  ) {}

  @Query(() => [Attachment])
  async attachments() {
    const { files, folders } = await this.attachmentService.listCloudContent();
    // const links = await this.attachmentService.loadEntities(getManager());
    return [
      ...files.map((x) => ({
        id: x.path,
        isFolder: false,
        displayName: x.path,
      })),
      ...folders.map((x) => ({
        id: x.prefix,
        isFolder: true,
        displayName: x.prefix,
      })),
    ];
  }

  @Query(() => Attachment)
  async attachment(@Args('id', { type: () => String }) id: string) {
    /*const { files, folders } = await this.attachmentService.listCloudContent();
    // const links = await this.attachmentService.loadEntities(getManager());
    return [
      ...files.map(x => ({ id: x.path, isFolder: false, displayName: x.path })),
      ...folders.map(x => ({ id: x.prefix, isFolder: true, displayName: x.prefix })),
    ];
    */
    return { id } as any;
  }

  @Mutation(() => Attachment)
  async saveAttachment(
    @Args('args') objData: AttachmentSaveArgs,
    @CurrentUser() user,
  ): Promise<AttachmentModel> {
    return await this.attachmentService.save(getManager(), objData, user);
  }
}
