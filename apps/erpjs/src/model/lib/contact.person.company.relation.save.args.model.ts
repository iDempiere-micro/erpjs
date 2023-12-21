import { BaseSaveArgsModel } from './base.save.args.model';

export interface ContactPersonCompanyRelationSaveArgsModel
  extends BaseSaveArgsModel {
  role: string;
  customerId: number;
  contactPersonId: number;
  isActive: boolean;
}
