import { Test } from '@nestjs/testing';
import { roundNumber, sum } from '../../util';
import { SalesInvoiceModel } from '../entities/sales.invoice.model';
import { SalesInvoiceVatModel } from '../entities/sales.invoice.vat.model';
import { BankAccountModel } from '../entities/bank.account.model';
import { CustomerModel } from '../entities/customer.model';
import {
  CurrencyModel,
  CurrencyRateService,
  Injector,
  OrganizationModel,
  ProductQuantityPriceTaxModel,
  SalesInvoiceService,
  SalesInvoiceVatService
} from '@erpjs/model';

class TestInvoice implements SalesInvoiceModel {
  paymentTermInDays: number;
  content: string;
  printDate: Date;
  printError: string;
  printed: boolean;
  isCalculated: boolean;
  documentNo?: string;
  isDraft: boolean;
  currencyMultiplyingRateToAccountingSchemeCurrency: number;
  grandTotalAccountingSchemeCurrency: number;
  totalLinesAccountingSchemeCurrency: number;
  vatReport: Promise<Array<SalesInvoiceVatModel>>;
  bankAccount: Promise<BankAccountModel>;
  currency: Promise<CurrencyModel>;
  customer: Promise<CustomerModel>;
  displayName: string;
  dueDate: Date;
  grandTotal: number;
  id: any;
  issuedOn: Date;
  lines: Promise<Array<ProductQuantityPriceTaxModel>>;
  narration: string;
  organization = Promise.resolve({vatRegistrations:[{}]} as any);
  totalLines: number;
  transactionDate: Date;
}

class TestInvoiceServiceImpl extends SalesInvoiceService {
  rate = 1;

  constructor() {
    super();
    const injector = {} as any as Injector;
    injector.currencyRateService = new CurrencyRateService();
    injector.currencyRateService.getAccountingForDateAndOrg =
      async (transactionDate: Date, from: CurrencyModel, org: OrganizationModel) => ({
        id:0, displayName: '', currencyMultiplyingRate: this.rate, from: Promise.resolve(from), to: Promise.resolve(from),
          start: transactionDate, end: transactionDate});

    injector.salesInvoiceVatService = new SalesInvoiceVatService();
    injector.salesInvoiceVatService.createEntity = () => Promise.resolve({} as any);

    this.getInjector = () => injector;
  }

}

describe('SalesInvoiceService', () => {
  let service: TestInvoiceServiceImpl;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TestInvoiceServiceImpl]
    }).compile();

    service = app.get<TestInvoiceServiceImpl>(TestInvoiceServiceImpl);
  });

  const tax1 = Promise.resolve({
    id: 0, displayName: null, ratePercent: 10
  });
  const tax2 = Promise.resolve({
    id: 0, displayName: null, ratePercent: 18.5
  });
  const tax3 = Promise.resolve({
    id: 0, displayName: null, ratePercent: 21
  });

  describe('SalesInvoiceService', () => {
    it('calculatePrices nothing returns null', async () => {
      service.rate = 1;
      const result = await service.calculatePrices(
        null
      );
      expect(result).toBeNull();
    });
    it('calculatePrices somelines return correct', async () => {
      const lines : Array<ProductQuantityPriceTaxModel> = [
        { linePrice: 1000, lineTax: tax1, product: null, quantity: 0, narration: null },
        { linePrice: 10, lineTax: tax2, product: null, quantity: 0, narration: null }
      ] ;
      const invoice = new TestInvoice();
      invoice.lines = Promise.resolve(lines);
      service.rate = 1;
      const result = await service.calculatePrices(
        invoice
      );
      expect(result).not.toBeUndefined();
      expect(result).not.toBeNull();
      const resultLines = await result.lines;
      expect(resultLines).not.toBeNull();
      expect(resultLines.length).toBe(lines.length);
      expect(result.grandTotal).toBe(1111.85);
      expect(result.totalLines).toBe(1010);
      const vatReport = await result.vatReport;
      expect(vatReport).not.toBeUndefined();
      expect(vatReport).not.toBeNull();
      expect(vatReport.length).toBe(2);
      expect(roundNumber(sum(vatReport.map(x => x.vatTotalAccountingSchemeCurrency)),2)).toBe(roundNumber(1111.85-1010,2));
    });
    it('calculatePrices should round correctly', async () => {
      const lines = [
        { linePrice: 0.5, lineTax: tax1, product: null, quantity: 0, narration: null },
        { linePrice: 0.1, lineTax: tax2, product: null, quantity: 0, narration: null },
      ] ;
      const invoice = new TestInvoice();
      invoice.lines = Promise.resolve(lines);
      service.rate = 1;
      const result = await service.calculatePrices(
        invoice
      );
      expect(result).not.toBeUndefined();
      expect(result).not.toBeNull();
      const resultLines = await result.lines;
      expect(resultLines).not.toBeNull();
      expect(resultLines.length).toBe(lines.length);
      expect(result.grandTotal).toBe(0.67);
      expect(result.totalLines).toBe(0.6);
      const vatReport = await result.vatReport;
      expect(vatReport.length).toBe(2);
      expect(roundNumber(sum(vatReport.map(x => x.vatTotalAccountingSchemeCurrency)),2)).toBe(roundNumber(0.67-0.6,2));
    });
    it('calculatePrices should work with the currency rate correctly', async () => {
      const lines = [
        { linePrice: 45.00, lineTax: tax3, product: null, quantity: 0, narration: null },
      ] ;
      const invoice = new TestInvoice();
      invoice.lines = Promise.resolve(lines);
      service.rate = 24.29;
      const result = await service.calculatePrices(
        invoice
      );
      expect(result).not.toBeUndefined();
      expect(result).not.toBeNull();
      const resultLines = await result.lines;
      expect(resultLines).not.toBeNull();
      expect(resultLines.length).toBe(lines.length);
      expect(result.grandTotal).toBe(54.45);
      expect(result.totalLines).toBe(45);
      const vatReport = await result.vatReport;
      expect(vatReport.length).toBe(1);
      expect(vatReport[0].vatRatePercent).toBe((await tax3).ratePercent);
      expect(vatReport[0].vatTotalAccountingSchemeCurrency).toBe(229.54);
    });
  });
});
