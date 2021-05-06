import { BaseModel } from './base.model';

export interface AttachmentModel extends BaseModel {
  displayName: string;
  content: any;
}
