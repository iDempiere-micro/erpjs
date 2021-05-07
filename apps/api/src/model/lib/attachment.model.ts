import { BaseModel } from './base.model';

/**
 * This is the model for the real attachment. We do not store them in the
 * database; but we allow to upload an attachment to the cloud storage
 * through the service.
 * We do store the relationships between the cloud store document
 * and our entities.
 */
export interface AttachmentModel extends BaseModel {
  displayName: string;
  content: any;
}
