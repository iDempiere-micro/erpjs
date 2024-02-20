import { EntityManager, Repository } from 'typeorm';
import { SMCloudStore } from '../../../../../absorb/SMCloudStore/smcloudstore/src/SMCloudStore';
import {
  Attachment,
  CloudFile,
  CloudFolder,
} from '../generated/entities/Attachment';
import { AttachmentModel } from './attachment.model';
import { AttachmentSaveArgsModel } from './attachment.save.args.model';
import { BaseEntityService } from './base.entity.service';

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

  storage = SMCloudStore.create('aws-s3', this.connection, {
    createListItemObject: () => new CloudFile(),
    createListItemPrefix: () => new CloudFolder(),
  });

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

  async getFileAsBase64(id: string) {
    await this.ensureContainer();
    return await this.storage.getObjectBase64(process.env.ATT_CONTAINER, id);
  }
  async getFileAsStream(id: string) {
    await this.ensureContainer();
    return await this.storage.getObject(process.env.ATT_CONTAINER, id);
  }

  typeName(): string {
    return AttachmentServiceKey;
  }
}
