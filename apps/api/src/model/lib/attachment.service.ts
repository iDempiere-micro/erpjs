import { EntityManager, Repository } from 'typeorm';
import { AttachmentModel } from './attachment.model';
import { AttachmentSaveArgsModel } from './attachment.save.args.model';
import { BaseEntityService } from './base.entity.service';
import { Attachment, CloudFile, CloudFolder } from '../generated/entities/Attachment';
import { SMCloudStore } from '../../../../../absorb/SMCloudStore/smcloudstore/src/SMCloudStore';
import { ListItemObject, ListItemPrefix } from '../../../../../absorb/SMCloudStore/core/src/StorageProvider';

export const AttachmentServiceKey = 'AttachmentService';

export class AttachmentService extends BaseEntityService<
  AttachmentModel,
  AttachmentSaveArgsModel
> {
  createEntity(): AttachmentModel {
    return new Attachment();
  }

  connection = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
  };

  storage = SMCloudStore.create(
    'aws-s3',
    this.connection,
    {
      createListItemObject : () => new CloudFile(),
      createListItemPrefix : () => new CloudFolder()
    }
  );

  ensureContainer = () =>
    this.storage.ensureContainer(process.env.ATT_CONTAINER);

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

    // await ensureContainer();

    attachment.content = args.content;
    return attachment;
  }

  async listCloudContent() {
    await this.ensureContainer();
    return await this.storage.listObjects(process.env.ATT_CONTAINER);
  }

  typeName(): string {
    return AttachmentServiceKey;
  }
}
