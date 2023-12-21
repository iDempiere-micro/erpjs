import { Test } from '@nestjs/testing';
import {
  SaveArgsValidationService,
  SaveArgsValidationServiceKey,
} from './save.args.validation.service';
import { UserModel } from './user.model';
import { BankModel } from './bank.model';
import { AddressServiceKey } from './address.service';
import { BankAccountServiceKey } from './bank.account.service';
import { AccountingSchemeServiceKey } from './accounting.scheme.service';
import { FactoringProviderService } from './factoring.provider.service';

let mockBankAccountServiceCalled = false;

const mockBankAccountService = {
  save: (x) => {
    mockBankAccountServiceCalled = true;
    return x;
  },
};
export const mockBankAccountServiceProvider = {
  provide: BankAccountServiceKey,
  useValue: mockBankAccountService,
};
const mockAddressService = {
  save: (x) => x,
};
export const mockAddressServiceProvider = {
  provide: AddressServiceKey,
  useValue: mockAddressService,
};
const mockAccountingSchemeService = {};
export const mockAccountingSchemeServiceProvider = {
  provide: AccountingSchemeServiceKey,
  useValue: mockAccountingSchemeService,
};

const mockEntityManager = {
  getRepository: () => ({
    save: (x) => x,
  }),
} as any;

(global as any).moduleRef = {
  get: () /*token*/ =>
    /*token === SalesInvoiceServiceKey
      ? mockSalesInvoiceService
      :*/ new SaveArgsValidationService(),
};

const saveArgsValidationServiceProvider = {
  provide: SaveArgsValidationServiceKey,
  useClass: SaveArgsValidationService,
};

describe('FactoringProviderService', () => {
  let service: FactoringProviderService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        FactoringProviderService,
        mockBankAccountServiceProvider,
        mockAddressServiceProvider,
        saveArgsValidationServiceProvider,
        mockAccountingSchemeServiceProvider,
      ],
    }).compile();

    service = app.get<FactoringProviderService>(FactoringProviderService);
  });

  it('will create a new bank account if needed and set the document numbering', async () => {
    mockBankAccountServiceCalled = false;
    await service.save(
      mockEntityManager,
      {
        displayName: '',
        legalName: '',

        newBankAccount: {
          bank: {} as BankModel,
          displayName: '',
          bankAccountCustomerPrintableNumber: '',
          iban: '',
          swift: '',
        },

        contact: '',
      },
      { id: 1 } as UserModel,
    );
    expect(mockBankAccountServiceCalled).toBeTruthy();
  });
});
