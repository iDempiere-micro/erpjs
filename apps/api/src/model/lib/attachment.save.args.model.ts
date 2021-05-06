import { BaseSaveArgsModel } from './base.save.args.model';

export interface AttachmentSaveArgsModel
  extends BaseSaveArgsModel {
  displayName: string;
  content: any;
}
