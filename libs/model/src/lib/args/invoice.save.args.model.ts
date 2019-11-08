import { BaseSaveArgsModel } from './base.save.args.model';

export interface InvoiceSaveArgsModel extends BaseSaveArgsModel {
  dueDate: Date;
}
