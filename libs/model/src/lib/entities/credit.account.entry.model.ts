import { BaseModel } from './base.model';
import { HasAmount } from '../helpers/has.amount';
import { HasAccount } from '../helpers/has.account';

export interface CreditAccountEntryModel extends BaseModel, HasAmount, HasAccount {

}
