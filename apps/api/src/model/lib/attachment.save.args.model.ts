import { BaseSaveArgsModel } from './base.save.args.model';

/**
 * Saving an attachment allows both uploading the content if specified and/or
 * mapping an attachment to an erp entity like an invoice
 */
export interface AttachmentSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  content?: any;
}
