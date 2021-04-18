import { Test } from '@nestjs/testing';
import { ProductModel } from './product.model';
import { CustomerModel } from './customer.model';
import { SalesInvoiceModel } from './sales.invoice.model';
import { TaxServiceKey } from './tax.service';
import { ProductServiceKey } from './product.service';
import {
  SalesInvoiceLineService,
  SalesInvoiceServiceKey,
} from './sales.invoice.service';
import {
  SaveArgsValidationService,
  SaveArgsValidationServiceKey,
} from './save.args.validation.service';
import { UserModel } from './user.model';

const customer: CustomerModel = {
  invoicingEmail: '',
  idNumber: '',
  id: 0,
  displayName: '',
  legalName: '',
  legalAddress: {} as any,
};

const invoice: SalesInvoiceModel = {
  printLanguage: undefined,
  reverseCharge: false,
  paymentTermInDays: 0,
  currencyMultiplyingRateToAccountingSchemeCurrency: 1,
  vatReport: [{} as any],
  isCalculated: false,
  isDraft: false,
  id: 0,
  lines: [{} as any],
  customer: customer,
  currency: {} as any,
  totalLines: 0,
  transactionDate: new Date(),
  organization: {} as any,
  dueDate: new Date(),
  bankAccount: {} as any,
  printed: false,
  issuedOn: new Date(),
  grandTotalAccountingSchemeCurrency: 0,
  grandTotal: 0,
  totalLinesAccountingSchemeCurrency: 0,
};

const product: ProductModel = {
  sku: '',
  id: 0,
  displayName: '',
};

const QUANTITY = 10;

const mockTaxService = {};
export const mockTaxServiceProvider = {
  provide: TaxServiceKey,
  useValue: mockTaxService,
};
const mockProductService = {};
export const mockProductServiceProvider = {
  provide: ProductServiceKey,
  useValue: mockProductService,
};
const mockSalesInvoiceService = {};
export const mockSalesInvoiceServiceProvider = {
  provide: SalesInvoiceServiceKey,
  useValue: mockSalesInvoiceService,
};

const mockEntityManager = {
  getRepository: () => ({
    save: x => x,
  }),
} as any;

(global as any).moduleRef = {
  get: token => {
    switch (token) {
      case SalesInvoiceServiceKey:
        return mockSalesInvoiceService;
      default:
        return new SaveArgsValidationService();
    }
  },
};

const saveArgsValidationServiceProvider = {
  provide: SaveArgsValidationServiceKey,
  useClass: SaveArgsValidationService,
};

describe('SalesInvoiceLineService', () => {
  let service: SalesInvoiceLineService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        SalesInvoiceLineService,
        mockTaxServiceProvider,
        mockProductServiceProvider,
        mockSalesInvoiceServiceProvider,
        saveArgsValidationServiceProvider,
      ],
    }).compile();

    service = app.get<SalesInvoiceLineService>(SalesInvoiceLineService);
  });

  it('line price is taken from the linePrice field (no calculation yet)', async () => {
    const line = await service.save(
      mockEntityManager,
      {
        narration: '',
        linePrice: 2 * QUANTITY,
        invoice,
        lineOrder: 0,
        quantity: QUANTITY,
        lineTax: {} as any,
        product,
      },
      { id: 1 } as UserModel,
    );
    expect(line.linePrice).toBe(2 * QUANTITY);
  });

  it('line price is taken from the customer group price list if that exists', async () => {
    const line = await service.save(
      mockEntityManager,
      {
        narration: '',
        linePrice: 2 * QUANTITY,
        invoice,
        lineOrder: 0,
        quantity: QUANTITY,
        lineTax: {} as any,
        product,
      },
      { id: 1 } as UserModel,
    );
    expect(line.linePrice).toBe(2 * QUANTITY);
  });
});
