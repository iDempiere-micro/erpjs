import { BaseSaveArgsModel } from './base.save.args.model';

export interface BankSaveArgsModel extends BaseSaveArgsModel {
  bankIdentifierCode: string;
  displayName: string;
}
