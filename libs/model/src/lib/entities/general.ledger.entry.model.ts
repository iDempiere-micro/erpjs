import { BaseModel } from './base.model';
import { GeneralJournalEntryModel } from './general.journal.entry.model';
import { HasAccount } from '../helpers/has.account';
import { HasTransactionDate } from '../helpers/has.transaction.date';

export interface GeneralLedgerEntryModel extends BaseModel, HasAccount, HasTransactionDate {
  amount: number;
  // isCredit === true => Credit otherwise Debit
  isCredit: boolean;
  journalEntries: Promise<Array<GeneralJournalEntryModel>>;
  postDate: Date;
}
