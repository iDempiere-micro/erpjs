import { BaseModel } from './base.model';
import { GeneralJournalEntryModel } from './general.journal.entry.model';
import { HasAccount, HasTransactionDate } from '../..';

export interface GeneralLedgerEntryModel extends BaseModel, HasAccount, HasTransactionDate {
  amount: number;
  // isCredit === true => Credit otherwise Debit
  isCredit: boolean;
  journalEntries: Promise<Array<GeneralJournalEntryModel>>;
  postDate: Date;
}
