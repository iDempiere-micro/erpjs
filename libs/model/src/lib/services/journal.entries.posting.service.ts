import { dateFromDayOfYear, DayOfYear, dayOfYear, groupBy, sum } from '../../util';
import { GeneralJournalEntryModel } from '../entities/general.journal.entry.model';
import { GeneralLedgerEntryModel } from '../entities/general.ledger.entry.model';

const { map } = require('p-iteration');

/**
 * Service to post journal entries to general ledger accounts.
 */
export class JournalEntriesPostingService {
  async postToGeneralLedger( entries: Array<GeneralJournalEntryModel> ): Promise<Array<GeneralLedgerEntryModel>> {
    // first divide the journal entries by the transaction date, we post transactions
    // together for a day, but we want to keep the account balance by day correct
    const entriesByTransactionDate =
      await groupBy(entries.filter( y => !y.posted ),
        async x => dayOfYear((await x.transaction).transactionDate) );

    const converted: Array<GeneralLedgerEntryModel> = [];

    // iterate through the days of the transactions
    for ( const [entryDayOfYear,entriesOnDate] of entriesByTransactionDate) {
      // in a day go through the journal entries on that day
      for (const entryOnDate of entriesOnDate) {
        async function mapper(arr, credit) {
          return await map(await arr, async c => ({ account: await c.account, credit, amount: c.amount, entryOnDate }))
        }

        // group the journal entry credits and debits by 1. account and 2. credit/debit
        // mark down also the whole journal entry
        const items =
          await groupBy(
            (await mapper(entryOnDate.credits, true)).concat(await mapper(entryOnDate.debits, false)),
            x => ({ accountId: x.account.id, credit:x.credit}),
            x => ({ account: x.account, credit:x.credit, entryOnDate}),
          );

        // go through all the journal entries that are to the same account and are of the same credit/debit type
        for ( const [entry, toBeSummed ] of items ) {
          // we are safe to sum all the amounts because they will go to the same account and credit/debit column
          const amount = sum(toBeSummed.map( x => (x as any).amount ));

          // mark down the struct almost the same as the result, just with the one journal entry we were iterating through
          // also the transaction date is normalized to the beginning of the day
          converted.push(
            {
              id: undefined,
              account: entry.account,
              isCredit: entry.credit,
              amount,
              journalEntries: Promise.resolve([entry.entryOnDate]),
              transactionDate: dateFromDayOfYear(entryDayOfYear as DayOfYear),
              postDate: new Date(),
              displayName: ''
            }
          );
        }

      }

    }

    // now we will group the result of the previous iteration again by 1. account and 2. credit/debit and 3. transaction date
    const entriesByAccountCreditTransactionDate = await groupBy(
      converted,
      x => ({accountId: x.account.id, credit: x.isCredit, dayOfYear: dayOfYear(x.transactionDate)}),
      x => ({account: x.account, credit: x.isCredit, transactionDate: x.transactionDate})
    );
    const deduplicated: Array<GeneralLedgerEntryModel> = [];

    // iterating through the grouped data...
    for ( const [entry, toBeSummed ] of entriesByAccountCreditTransactionDate ) {
      // ... we are again safe to sum all the amounts because they will go to the same account and credit/debit column
      // on the same day
      const amount = sum(toBeSummed.map( x => (x as any).amount ));
      const h1 = (await map(toBeSummed, async x => await (x as any).journalEntries));
      const journalEntries =  [].concat.apply([], h1);
      deduplicated.push(
        {
          id: undefined,
          account: entry.account,
          isCredit: entry.credit,
          amount,
          journalEntries: Promise.resolve(journalEntries),
          transactionDate: entry.transactionDate,
          postDate: new Date(),
          displayName: ''
        }
      );
    }

    return deduplicated;
  }
}
