import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Attachment } from '../../model/generated/entities/Attachment';
import { AttachmentModel } from '../../model/lib/attachment.model';
import {
  AttachmentService,
  AttachmentServiceKey,
} from '../../model/lib/attachment.service';
import { AttachmentSaveArgs } from '../saveArgs/attachment.save.args';

@Resolver(() => Attachment)
@UseGuards(GqlAuthGuard)
export class AttachmentResolver {
  constructor(
    @Inject(AttachmentServiceKey)
    protected readonly attachmentService: AttachmentService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [Attachment])
  async attachments() {
    const { files, folders } = await this.attachmentService.listCloudContent();
    // const links = await this.attachmentService.loadEntities(this.entityManager);
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
    // const links = await this.attachmentService.loadEntities(this.entityManager);
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
    return await this.attachmentService.save(this.entityManager, objData, user);
  }
}
