import { BaseModel, HasTransactionDate } from '../..';

export interface TransactionModel extends BaseModel, HasTransactionDate {
  // transaction explanation
  narration: string;
}
