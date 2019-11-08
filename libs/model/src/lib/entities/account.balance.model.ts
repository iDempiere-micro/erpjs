import { BaseModel, HasAccount, HasAmount } from '../..';

export interface AccountBalanceModel extends BaseModel, HasAmount, HasAccount {
  date: Date;
}
