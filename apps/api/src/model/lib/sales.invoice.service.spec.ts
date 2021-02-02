import { Test } from '@nestjs/testing';

import * as _ from 'lodash';
import { EntityManager } from 'typeorm/index';
import { TaxServiceKey } from './tax.service';
import { ProductServiceKey } from './product.service';
import {
  SalesInvoiceLineServiceKey,
  SalesInvoiceService,
} from './sales.invoice.service';
import { BankAccountServiceKey } from './bank.account.service';
import { CustomerServiceKey } from './customer.service';
import { OrganizationServiceKey } from './organization.service';
import { CurrencyServiceKey } from './currency.service';
import { ReportsServiceKey } from './reports.service';
import { LanguagesServiceKey } from './languages.service';
import { CurrencyModel } from './currency.model';
import { OrganizationModel } from './organization.model';
import { CurrencyRateServiceKey } from './currency.rate.service';
import { SalesInvoiceVatServiceKey } from './sales.invoice.vat.service';
import { DocumentNumberingServiceKey } from './document.numbering.service';
import {
  SaveArgsValidationService,
  SaveArgsValidationServiceKey,
} from './save.args.validation.service';
import { TaxModel } from './tax.model';
import { SalesInvoiceLineModel } from './sales.invoice.line.model';
import { SalesInvoice } from '../generated/entities/SalesInvoice';

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
const mockSalesInvoiceLineService = {};
export const mockSalesInvoiceLineServiceProvider = {
  provide: SalesInvoiceLineServiceKey,
  useValue: mockSalesInvoiceLineService,
};
const mockBankAccountService = {};
export const mockBankAccountServiceProvider = {
  provide: BankAccountServiceKey,
  useValue: mockBankAccountService,
};
const mockCustomerService = {};
export const mockCustomerServiceProvider = {
  provide: CustomerServiceKey,
  useValue: mockCustomerService,
};
const mockOrganizationService = {};
export const mockOrganizationServiceProvider = {
  provide: OrganizationServiceKey,
  useValue: mockOrganizationService,
};
const mockCurrencyService = {};
export const mockCurrencyServiceProvider = {
  provide: CurrencyServiceKey,
  useValue: mockCurrencyService,
};
const mockReportsService = {};
export const mockReportsServiceProvider = {
  provide: ReportsServiceKey,
  useValue: mockReportsService,
};
const mockLanguagesService = {};
export const mockLanguagesServiceProvider = {
  provide: LanguagesServiceKey,
  useValue: mockLanguagesService,
};
const mockCurrencyRateService = {
  rate: 1,
  getAccountingForDateAndOrg: (
    transactionalEntityManager: EntityManager,
    transactionDate: Date,
    from: CurrencyModel,
    org: OrganizationModel,
  ) => ({
    id: 0,
    displayName: '',
    currencyMultiplyingRate: mockCurrencyRateService.rate,
    from,
    to: from,
    start: transactionDate,
    end: transactionDate,
  }),
};
export const mockCurrencyRateServiceProvider = {
  provide: CurrencyRateServiceKey,
  useValue: mockCurrencyRateService,
};
const mockSalesInvoiceVatService = {
  save: (transactionalEntityManager, entity) => entity,
};
export const mockSalesInvoiceVatServiceProvider = {
  provide: SalesInvoiceVatServiceKey,
  useValue: mockSalesInvoiceVatService,
};
const mockDocumentNumberingService = {};
export const mockDocumentNumberingServiceProvider = {
  provide: DocumentNumberingServiceKey,
  useValue: mockDocumentNumberingService,
};
const saveArgsValidationServiceProvider = {
  provide: SaveArgsValidationServiceKey,
  useClass: SaveArgsValidationService,
};

const mockEntityManager = {
  getRepository: () => ({
    save: x => x,
  }),
} as any;

(global as any).moduleRef = {
  get: () => mockSalesInvoiceLineService,
};

describe('SalesInvoiceService', () => {
  let service: SalesInvoiceService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        SalesInvoiceService,
        mockTaxServiceProvider,
        mockProductServiceProvider,
        mockSalesInvoiceLineServiceProvider,
        mockBankAccountServiceProvider,
        mockCustomerServiceProvider,
        mockOrganizationServiceProvider,
        mockCurrencyServiceProvider,
        mockReportsServiceProvider,
        mockLanguagesServiceProvider,
        mockCurrencyRateServiceProvider,
        mockSalesInvoiceVatServiceProvider,
        mockDocumentNumberingServiceProvider,
        saveArgsValidationServiceProvider,
      ],
    }).compile();

    service = app.get<SalesInvoiceService>(SalesInvoiceService);
  });

  const tax1: TaxModel = {
    id: 0,
    displayName: null,
    ratePercent: 10,
    isStandard: false,
  };
  const tax2 = {
    id: 0,
    displayName: null,
    ratePercent: 18.5,
    isStandard: false,
  };
  const tax3 = {
    id: 0,
    displayName: null,
    ratePercent: 21,
    isStandard: false,
  };

  describe('SalesInvoiceService', () => {
    it('calculatePrices nothing returns null', async () => {
      const result = await service.calculatePrices(null, null);
      expect(result).toBeNull();
    });
    it('calculatePrices somelines return correct', async () => {
      const lines: Array<SalesInvoiceLineModel> = [
        {
          linePrice: 1000,
          lineTax: tax1,
          product: null,
          quantity: 0,
          narration: null,
          id: 1,
          lineOrder: 1,
          invoice: null,
        },
        {
          linePrice: 10,
          lineTax: tax2,
          product: null,
          quantity: 0,
          narration: null,
          id: 2,
          lineOrder: 2,
          invoice: null,
        },
      ];
      const invoice = new SalesInvoice();
      invoice.lines = lines;
      invoice.organization = { vatNumber: 'ABC' } as any;
      invoice.lines.forEach(x => (x.invoice = invoice));
      mockCurrencyRateService.rate = 1;
      const result = await service.calculatePrices(null, invoice);
      expect(result).not.toBeUndefined();
      expect(result).not.toBeNull();
      const resultLines = result.lines;
      expect(resultLines).not.toBeNull();
      expect(resultLines.length).toBe(lines.length);
      expect(result.grandTotal).toBe(1111.85);
      expect(result.totalLines).toBe(1010);
      const vatReport = result.vatReport;
      expect(vatReport).not.toBeUndefined();
      expect(vatReport).not.toBeNull();
      expect(vatReport.length).toBe(2);
      expect(
        _.round(
          _.sum(vatReport.map(x => x.vatTotalAccountingSchemeCurrency)),
          2,
        ),
      ).toBe(_.round(1111.85 - 1010, 2));
    });
    it('calculatePrices should round correctly', async () => {
      const lines = [
        {
          linePrice: 0.5,
          lineTax: tax1,
          product: null,
          quantity: 0,
          narration: null,
          lineOrder: 1,
          id: 1,
          invoice: null,
        },
        {
          linePrice: 0.1,
          lineTax: tax2,
          product: null,
          quantity: 0,
          narration: null,
          lineOrder: 2,
          id: 2,
          invoice: null,
        },
      ];
      const invoice = new SalesInvoice();
      invoice.lines = lines;
      invoice.organization = { vatNumber: 'ABC' } as any;
      invoice.lines.forEach(x => (x.invoice = invoice));
      mockCurrencyRateService.rate = 1;
      const result = await service.calculatePrices(null, invoice);
      expect(result).not.toBeUndefined();
      expect(result).not.toBeNull();
      const resultLines = result.lines;
      expect(resultLines).not.toBeNull();
      expect(resultLines.length).toBe(lines.length);
      expect(result.grandTotal).toBe(0.67);
      expect(result.totalLines).toBe(0.6);
      const vatReport = result.vatReport;
      expect(vatReport.length).toBe(2);
      expect(
        _.round(
          _.sum(vatReport.map(x => x.vatTotalAccountingSchemeCurrency)),
          2,
        ),
      ).toBe(_.round(0.67 - 0.6, 2));
    });
    it('calculatePrices should work with the currency rate correctly', async () => {
      const lines = [
        {
          linePrice: 45.0,
          lineTax: tax3,
          product: null,
          quantity: 0,
          narration: null,
          lineOrder: 1,
          id: 1,
          invoice: null,
        },
      ];
      const invoice = new SalesInvoice();
      invoice.lines = lines;
      invoice.organization = { vatNumber: 'ABC' } as any;
      invoice.lines.forEach(x => (x.invoice = invoice));
      mockCurrencyRateService.rate = 24.29;
      const result = await service.calculatePrices(null, invoice);
      expect(result).not.toBeUndefined();
      expect(result).not.toBeNull();
      const resultLines = result.lines;
      expect(resultLines).not.toBeNull();
      expect(resultLines.length).toBe(lines.length);
      expect(result.grandTotal).toBe(54.45);
      expect(result.totalLines).toBe(45);
      const vatReport = result.vatReport;
      expect(vatReport.length).toBe(1);
      expect(vatReport[0].vatRatePercent).toBe((await tax3).ratePercent);
      expect(vatReport[0].vatTotalAccountingSchemeCurrency).toBe(229.54);
    });
  });
});
