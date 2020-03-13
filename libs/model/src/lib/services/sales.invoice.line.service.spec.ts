import { Test } from '@nestjs/testing';
import {
  CustomerGroupModel,
  CustomerGroupService,
  CustomerModel,
  CustomerPriceListModel,
  CustomerPriceListService,
  CustomerProductPriceModel,
  Injector,
  ProductModel,
  SalesInvoiceLineModel,
  SalesInvoiceLineService,
  SalesInvoiceModel,
  TaxModel
} from '@erpjs/model';

class TestInvoiceLine implements SalesInvoiceLineModel {
  displayName: string;
  id: any;
  invoice: Promise<SalesInvoiceModel>;
  lineOrder: number;
  linePrice: number;
  lineTax: Promise<TaxModel>;
  narration: string;
  product: Promise<ProductModel>;
  quantity: number;
}

const product : ProductModel = {
  sku: '',
  id: 0,
  displayName: ''
};

const PRODUCT_PRICE = 123;
const QUANTITY = 10;

const customerProductPriceModel: CustomerProductPriceModel = {
  customerPriceList: undefined, displayName: '', id: undefined,
  sellingPrice: PRODUCT_PRICE,
  product: Promise.resolve(product)
};

const customerPriceListModel: CustomerPriceListModel = {
  customerGroup: Promise.resolve({} as any),
  id: 0,
  displayName: '',
  productPrices: Promise.resolve([customerProductPriceModel]),
};

class TestInvoiceLineServiceImpl extends SalesInvoiceLineService {
  constructor() {
    super();
    this.createEntity = () => Promise.resolve(new TestInvoiceLine());
    const customerGroupService = new CustomerGroupService();
    customerGroupService.findCustomerGroup = (customer1: CustomerModel) => Promise.resolve({
      customers: Promise.resolve([customer]),
      id: 0,
      displayName: ''
    });
    const customerPriceListService = new CustomerPriceListService();
    customerPriceListService.loadByCustomerGroupAndProduct =
      (customerGroup: CustomerGroupModel, product1: ProductModel) => Promise.resolve(customerPriceListModel);
    const injector = {customerGroupService, customerPriceListService} as any as Injector;
    this.getInjector = () => injector;
  }
}

const customer: CustomerModel = {
  invoicingEmail: '',
  idNumber: '',
  id: 0,
  displayName: '',
  legalName: '',
  legalAddress: Promise.resolve({} as any)
};

const invoice: SalesInvoiceModel = {
  printLanguage: undefined,
  reverseCharge: false,
  paymentTermInDays: 0,
  currencyMultiplyingRateToAccountingSchemeCurrency: 1,
  vatReport: Promise.resolve([{} as any ]),
  isCalculated: false,
  isDraft: false,
  id: 0,
  displayName: '',
  lines: Promise.resolve([{} as any ]),
  customer: Promise.resolve(customer),
  currency: Promise.resolve({} as any),
  totalLines: 0,
  narration: '',
  transactionDate: new Date(),
  organization : Promise.resolve({vatRegistrations:[{}]} as any),
  dueDate: new Date(),
  bankAccount: Promise.resolve({} as any),
  printed: false,
  issuedOn: new Date(),
  grandTotalAccountingSchemeCurrency: 0,
  grandTotal: 0,
  totalLinesAccountingSchemeCurrency: 0
};

describe('SalesInvoiceLineService', () => {
  let service: TestInvoiceLineServiceImpl;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TestInvoiceLineServiceImpl]
    }).compile();

    service = app.get<TestInvoiceLineServiceImpl>(TestInvoiceLineServiceImpl);
  });

  it('line price is correctly calculated', async () => {
    const line = await service.save(
      {
        narration: '',
        linePrice: 0,
        invoice,
        lineOrder : 0,
        quantity: QUANTITY,
        lineTax: {} as any,
        product,
      }
    );
    expect(line.linePrice).toBe(QUANTITY * PRODUCT_PRICE)
  });
});
