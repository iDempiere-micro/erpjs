import { BaseModel } from './base.model';
import { HasAccount, HasAmount } from '../..';

export interface CreditAccountEntryModel extends BaseModel, HasAmount, HasAccount {

}
