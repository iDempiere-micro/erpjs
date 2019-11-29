import { BaseSaveArgsModel } from './base.save.args.model';
import { AccountingSchemeModel } from '../entities/accounting.scheme.model';

export interface AccountSaveArgsModel extends BaseSaveArgsModel {
  code:string;
  displayName: string;
  accountingScheme?: Promise<AccountingSchemeModel>;
  accountingSchemeId?: number;
}
