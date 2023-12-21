import { BaseModel } from './base.model';

export interface TaxModel extends BaseModel {
  ratePercent: number;
  isStandard: boolean;
  displayName: string;
}
