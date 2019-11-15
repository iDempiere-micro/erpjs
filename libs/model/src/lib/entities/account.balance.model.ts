import { BaseModel } from './base.model';
import { HasAmount } from '../helpers/has.amount';
import { HasAccount } from '../helpers/has.account';

export interface AccountBalanceModel extends BaseModel, HasAmount, HasAccount {
  date: Date;
}
