import { Test } from '@nestjs/testing';
import {
  SaveArgsValidationService,
  SaveArgsValidationServiceKey,
} from './save.args.validation.service';
import { UserModel } from './user.model';
import { OrganizationService } from './organization.service';
import { CountryModel } from './country.model';
import { BankModel } from './bank.model';
import { AddressServiceKey } from './address.service';
import { BankAccountServiceKey } from './bank.account.service';
import { AccountingSchemeServiceKey } from './accounting.scheme.service';
import { AccountingSchemeModel } from './accounting.scheme.model';
import { DocumentNumberingServiceKey } from './document.numbering.service';

let mockBankAccountServiceCalled = false;
let mockDocumentNumberingServiceCalled = false;

const mockDocumentNumberingService = {
  save: x => {
    mockDocumentNumberingServiceCalled = true;
    return x;
  },
};
export const mockDocumentNumberingServiceProvider = {
  provide: DocumentNumberingServiceKey,
  useValue: mockDocumentNumberingService,
};

const mockBankAccountService = {
  save: x => {
    mockBankAccountServiceCalled = true;
    return x;
  },
};
export const mockBankAccountServiceProvider = {
  provide: BankAccountServiceKey,
  useValue: mockBankAccountService,
};
const mockAddressService = {
  save: x => x,
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
    save: x => x,
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

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        OrganizationService,
        mockBankAccountServiceProvider,
        mockAddressServiceProvider,
        saveArgsValidationServiceProvider,
        mockAccountingSchemeServiceProvider,
        mockDocumentNumberingServiceProvider,
      ],
    }).compile();

    service = app.get<OrganizationService>(OrganizationService);
  });

  it('will create a new bank account if needed and set the document numbering', async () => {
    mockBankAccountServiceCalled = false;
    await service.save(
      mockEntityManager,
      {
        displayName: '',
        legalName: '',
        legalAddress: {
          city: '',
          line1: '',
          zipCode: '',
          country: {} as CountryModel,
        },

        newBankAccount: {
          bank: {} as BankModel,
          displayName: '',
          bankAccountCustomerPrintableNumber: '',
          iban: '',
          swift: '',
        },

        accountingScheme: {} as AccountingSchemeModel,

        registration: '',
        contact: '',
        idNumber: '',
        vatNumber: null,

        currentInvoiceDocumentNumber: 1000,
      },
      { id: 1 } as UserModel,
    );
    expect(mockBankAccountServiceCalled).toBeTruthy();
    expect(mockDocumentNumberingServiceCalled).toBeTruthy();
  });
});
