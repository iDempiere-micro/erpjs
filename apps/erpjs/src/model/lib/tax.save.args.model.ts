import { BaseSaveArgsModel } from './base.save.args.model';

export interface TaxSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  ratePercent: number;
  isStandard: boolean;
}
