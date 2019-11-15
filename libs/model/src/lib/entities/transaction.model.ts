import { BaseModel } from './base.model';
import { HasTransactionDate } from '../helpers/has.transaction.date';

export interface TransactionModel extends BaseModel, HasTransactionDate {
  // transaction explanation
  narration: string;
}
