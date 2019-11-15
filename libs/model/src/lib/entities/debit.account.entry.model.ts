import { BaseModel } from './base.model';
import { HasAmount } from '../helpers/has.amount';
import { HasAccount } from '../helpers/has.account';

export interface DebitAccountEntryModel extends BaseModel, HasAmount, HasAccount {

}
