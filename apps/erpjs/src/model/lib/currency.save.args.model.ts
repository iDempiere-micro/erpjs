import { BaseSaveArgsModel } from './base.save.args.model';

export interface CurrencySaveArgsModel extends BaseSaveArgsModel {
  isoCode: string;
  displayName: string;
}
