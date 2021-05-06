import { EntityManager, Repository } from 'typeorm';
import { AttachmentModel } from './attachment.model';
import { AttachmentSaveArgsModel } from './attachment.save.args.model';
import { BaseEntityService } from './base.entity.service';
import { Attachment } from '../generated/entities/Attachment';
import SMCloudStore  from 'smcloudstore';

export const AttachmentServiceKey = 'AttachmentService';

const connection = {
  accessKeyId: 'PUBLIC_KEY_HERE',
  secretAccessKey: 'SECRET_KEY_HERE',
  region: 'us-west-1'
}
const storage = SMCloudStore.Create('aws-s3', connection)

export class AttachmentService extends BaseEntityService<
  AttachmentModel,
  AttachmentSaveArgsModel
> {
  createEntity(): AttachmentModel {
    return new Attachment();
  }

  protected getRepository(
    transactionalEntityManager,
  ): Repository<AttachmentModel> {
    return transactionalEntityManager.getRepository(Attachment);
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: AttachmentSaveArgsModel,
    attachment: AttachmentModel,
  ): Promise<AttachmentModel> {
    attachment.displayName = args.displayName;
    attachment.content = args.content;
    return attachment;
  }

  typeName(): string {
    return AttachmentServiceKey;
  }
}
