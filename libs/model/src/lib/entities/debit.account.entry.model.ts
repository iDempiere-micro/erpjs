import { BaseModel } from './base.model';
import { HasAccount, HasAmount } from '../..';

export interface DebitAccountEntryModel extends BaseModel, HasAmount, HasAccount {

}
