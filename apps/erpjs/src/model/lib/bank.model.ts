import { BaseModel } from './base.model';

export interface BankModel extends BaseModel {
  bankIdentifierCode: string;
  displayName: string;
}
