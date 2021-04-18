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
import { CustomerGroupModel } from './customer.group.model';
import { CustomerPriceListServiceKey } from './customer.price.list.service';
import { CustomerPriceListModel } from './customer.price.list.model';
import { CustomerProductPriceModel } from './customer.product.price.model';
import * as moment from 'moment';

const customerGroup1: CustomerGroupModel = {
  id: 0,
  displayName: 'AAA',
  customers: [],
};

const customer: CustomerModel = {
  invoicingEmail: '',
  idNumber: '',
  id: 0,
  displayName: '',
  legalName: '',
  legalAddress: {} as any,
  customerGroup: customerGroup1,
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

const product1: ProductModel = {
  sku: '',
  id: 1,
  displayName: '',
};
const product2: ProductModel = {
  sku: '',
  id: 2,
  displayName: '',
};

const QUANTITY = 10;
const PRODUCT_GROUP_PRICE = 123;

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

const customerPriceListModel: CustomerPriceListModel = {
  id: 1,
  displayName: '',
  customerGroup: customerGroup1,
  productPrices: [
    {
      product: product2,
      sellingPrice: PRODUCT_GROUP_PRICE,
    } as CustomerProductPriceModel,
  ],
};

const mockCustomerPriceListService = {
  loadByCustomerGroupAndProduct: (
    transactionalEntityManager,
    customerGroup,
    product,
  ): CustomerPriceListModel =>
    product === product2 && customerGroup === customerGroup1
      ? customerPriceListModel
      : null,
};
const mockCustomerPriceListServiceProvider = {
  provide: CustomerPriceListServiceKey,
  useValue: mockCustomerPriceListService,
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
        mockCustomerPriceListServiceProvider,
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
        product: product1,
      },
      { id: 1 } as UserModel,
    );
    expect(line.linePrice).toBe(2 * QUANTITY);
  });

  it('line price is taken from the customer group price list if that exists', async () => {
    customerPriceListModel.validTo = null;
    customerPriceListModel.validFrom = null;
    const line = await service.save(
      mockEntityManager,
      {
        narration: '',
        linePrice: 2 * QUANTITY,
        invoice,
        lineOrder: 0,
        quantity: QUANTITY,
        lineTax: {} as any,
        product: product2,
      },
      { id: 1 } as UserModel,
    );
    expect(line.linePrice).toBe(PRODUCT_GROUP_PRICE * QUANTITY);
  });

  it('line price is taken from the customer group price list if that exists and is valid', async () => {
    customerPriceListModel.validTo = null;
    customerPriceListModel.validFrom = moment().add(1,'days').toDate();
    const line = await service.save(
      mockEntityManager,
      {
        narration: '',
        linePrice: 2 * QUANTITY,
        invoice,
        lineOrder: 0,
        quantity: QUANTITY,
        lineTax: {} as any,
        product: product2,
      },
      { id: 1 } as UserModel,
    );
    expect(line.linePrice).not.toBe(PRODUCT_GROUP_PRICE * QUANTITY);
  });
});
