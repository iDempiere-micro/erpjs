import { Test } from '@nestjs/testing';
import { sum } from '../../util';
import { JournalEntriesPostingService } from './journal.entries.posting.service';

describe('JournalEntriesPostingService', () => {
  let service: JournalEntriesPostingService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [JournalEntriesPostingService]
    }).compile();

    service = app.get<JournalEntriesPostingService>(JournalEntriesPostingService);
  });

  describe('JournalEntriesPostingService', () => {
    const generalJournalEntryModel = {
      id: 0,
      displayName: '',
      transaction: Promise.resolve({
        id: 0,
        narration: '',
        displayName: '',
        transactionDate: new Date()
      }),
      credits: Promise.resolve([]),
      debits: Promise.resolve([]),
      posted: false,
    };

    it('postToGeneralLedger empty return empty', async () => {
      const test = await service.postToGeneralLedger([]);
      expect(test.length).toEqual(0);
    });
    it('postToGeneralLedger w/o posted return 0', async () => {
      const model = Object.assign({}, generalJournalEntryModel);
      model.posted = true;
      const test = await service.postToGeneralLedger([model]);
      expect(test.length).toEqual(0);
    });
    it('postToGeneralLedger 1 return 1', async () => {
      const model = Object.assign({}, generalJournalEntryModel);
      const account1 = Promise.resolve({ id: 1});
      const account2 = Promise.resolve({ id: 2});
      model.credits = Promise.resolve( [ { amount: 1, account: account1 }, { amount: 2, account: account1 } ] );
      model.debits = Promise.resolve( [ { amount: 3, account: account2 }, { amount: 4, account: account2 } ] );
      const test = await service.postToGeneralLedger([model]);
      expect(test.length).toEqual(2);
    });
    it('postToGeneralLedger 2 return 1', async () => {
      const model1 = Object.assign({}, generalJournalEntryModel);
      const model2 = Object.assign({}, generalJournalEntryModel);
      const account1 = Promise.resolve({ id: 1 });
      const account2 = Promise.resolve({ id: 2 });
      function setModel(model) {
        model.credits = Promise.resolve([{ amount: 1, account: account1 }, { amount: 2, account: account1 }]);
        model.debits = Promise.resolve([{ amount: 3, account: account2 }, { amount: 4, account: account2 }]);
        return model;
      }
      const test = await service.postToGeneralLedger([setModel(model1),setModel(model2)]);
      expect(test.length).toEqual(2);
      expect(sum(test.map( x=> x.amount ))).toBe(6+14);
    });
  });
});
