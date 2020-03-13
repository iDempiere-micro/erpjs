import { Module } from '@nestjs/common';
import { OrderServiceImplementation } from './order.service.implementation';
import { ModelConfigurationImplementation } from './model.configuration.implementation';
import { SalesInvoiceServiceImplementation } from './sales.invoice.service.implementation';
import { UserServiceImplementation } from './user.service.implementation';
import { CustomerServiceImplementation } from './customer.service.implementation';
import {
  AccountingSchemeServiceKey,
  AccountServiceKey,
  AddressServiceKey,
  BankAccountServiceKey,
  BankServiceKey,
  CalendarActivityServiceKey,
  CountryServiceKey,
  CurrencyRateServiceKey,
  CurrencyServiceKey,
  CustomerGroupServiceKey, CustomerOrderServiceKey,
  CustomerPriceListServiceKey,
  CustomerProductPriceServiceKey,
  CustomerServiceKey, FifoCostsOfGoodsSoldService, FifoCostsOfGoodsSoldServiceKey,
  Injector,
  LanguagesServiceKey,
  LeadServiceKey,
  OrganizationServiceKey, ProductIssueLineServiceKey, ProductIssueServiceKey,
  ProductQuantityOnHandService,
  ProductQuantityOnHandServiceKey,
  ProductReceiptLineService,
  ProductReceiptLineServiceKey, ProductReceiptService, ProductReceiptServiceKey,
  ProductServiceKey,
  ProspectServiceKey,
  RecurringSalesInvoiceLineServiceKey,
  RecurringSalesInvoiceServiceKey,
  SalesInvoiceLineServiceKey,
  SalesInvoiceServiceKey,
  SalesInvoiceVatServiceKey,
  SuspectServiceKey,
  TaskServiceKey,
  TaxServiceKey,
  TranslationServiceKey,
  UserServiceKey,
  UserToOrganizationServiceKey, WarehouseService, WarehouseServiceKey
} from '@erpjs/model';
import { AddressServiceImplementation } from './address.service.implementation';
import { OrganizationServiceImplementation } from './organization.service.implementation';
import { BankAccountServiceImplementation } from './bank.account.service.implementation';
import { BankServiceImplementation } from './bank.service.implementation';
import { CountryServiceImplementation } from './country.service.implementation';
import { EntityManager } from 'typeorm';
import { Session } from '../session';
import { CalendarActivityServiceImplementation } from './calendar.activity.service.implementation';
import { CurrencyServiceImplementation } from './currency.service.implementation';
import { AccountingSchemeServiceImplementation } from './accounting.scheme.service.implementation';
import { SalesInvoiceLineServiceImplementation } from './sales.invoice.line.service.implementation';
import { TaxServiceImplementation } from './tax.service.implementation';
import { SalesInvoiceVatServiceImplemenation } from './sales.invoice.vat.service.implemenation';
import { UserToOrganizationServiceImplementation } from './user.to.organization.service.implementation';
import { TaskServiceImplementation } from './task.service.implementation';
import { LeadServiceImplementation } from './lead.service.implementation';
import { ProspectServiceImplementation } from './prospect.service.implementation';
import { SuspectServiceImplementation } from './suspect.service.implementation';
import { ProductServiceImplementation } from './product.service.implementation';
import { CurrencyRateServiceImplementation } from './currency.rate.service.implementation';
import { RecurringSalesInvoiceServiceImplementation } from './recurring.sales.invoice.service.implementation';
import { RecurringSalesInvoiceLineServiceImplementation } from './recurring.sales.invoice.line.service.implementation';
import { AccountServiceImplementation } from './account.service.implementation';
import { CustomerGroupServiceImplementation } from './customer.group.service.implementation';
import { CustomerPriceListServiceImplementation } from './customer.price.list.service.implementation';
import { CustomerProductPriceServiceImplementation } from './customer.product.price.service.implementation';
import { TranslationServiceImplementation } from './translation.service.implementation';
import { LanguagesServiceImplementation } from './languages.service.implementation';
import { ProductQuantityOnHandServiceImplementation } from '@erp/data/src/lib/model/product.quantity.on-hand.service.implementation';
import { ProductReceiptLineServiceImplementation } from '@erp/data/src/lib/model/product.receipt.line.service.implementation';
import { ProductReceiptServiceImplementation } from '@erp/data/src/lib/model/product.receipt.service.implementation';
import { WarehouseServiceImplementation } from '@erp/data/src/lib/model/warehouse.service.implementation';
import { ProductIssueLineServiceImplementation } from '@erp/data/src/lib/model/product.issue.line.service.implementation';
import { ProductIssueServiceImplementation } from '@erp/data/src/lib/model/product.issue.service.implementation';
import { CustomerOrderServiceImplementation } from '@erp/data/src/lib/model/customer.order.service.implementation';

export const ORDER_SERVICE = 'OrderService';

const orderServiceProvider = { provide: ORDER_SERVICE, useClass: OrderServiceImplementation };
const modelConfigurationProvider = { provide: 'ModelConfiguration', useClass: ModelConfigurationImplementation };
const salesInvoiceServiceProvider = { provide: SalesInvoiceServiceKey, useClass: SalesInvoiceServiceImplementation };
const userServiceProvider = { provide: UserServiceKey, useClass: UserServiceImplementation };
const customerServiceProvider = { provide: CustomerServiceKey, useClass: CustomerServiceImplementation };
const addressServiceProvider = { provide: AddressServiceKey, useClass: AddressServiceImplementation };
const organizationServiceProvider = { provide: OrganizationServiceKey, useClass: OrganizationServiceImplementation };
const bankAccountServiceProvider = { provide: BankAccountServiceKey, useClass: BankAccountServiceImplementation };
const bankServiceProvider = { provide: BankServiceKey, useClass: BankServiceImplementation };
const countryServiceProvider = { provide: CountryServiceKey, useClass: CountryServiceImplementation };
const calendarActivityServiceProvider =
  { provide: CalendarActivityServiceKey, useClass: CalendarActivityServiceImplementation };
const currencyServiceProvider = { provide: CurrencyServiceKey, useClass: CurrencyServiceImplementation };
const accountingSchemeServiceProvider =
  { provide: AccountingSchemeServiceKey, useClass: AccountingSchemeServiceImplementation };
const salesInvoiceLineServiceProvider = { provide: SalesInvoiceLineServiceKey, useClass: SalesInvoiceLineServiceImplementation };
const taxServiceProvider = { provide: TaxServiceKey, useClass: TaxServiceImplementation };
const salesInvoiceVatServiceProvider = { provide: SalesInvoiceVatServiceKey, useClass: SalesInvoiceVatServiceImplemenation };
const userToOrganizationServiceProvider = { provide: UserToOrganizationServiceKey, useClass: UserToOrganizationServiceImplementation };
const taskServiceProvider = { provide: TaskServiceKey, useClass: TaskServiceImplementation };
const leadServiceProvider = { provide: LeadServiceKey, useClass: LeadServiceImplementation };
const prospectServiceProvider = { provide: ProspectServiceKey, useClass: ProspectServiceImplementation };
const suspectServiceProvider = { provide: SuspectServiceKey, useClass: SuspectServiceImplementation };
const productServiceProvider = { provide: ProductServiceKey, useClass: ProductServiceImplementation };
const currencyRateServiceProvider = { provide: CurrencyRateServiceKey, useClass: CurrencyRateServiceImplementation };
const recurringSalesInvoiceServiceProvider = { provide: RecurringSalesInvoiceServiceKey,
  useClass: RecurringSalesInvoiceServiceImplementation };
const recurringSalesInvoiceLineServiceProvider = { provide: RecurringSalesInvoiceLineServiceKey,
  useClass: RecurringSalesInvoiceLineServiceImplementation };
const accountServiceProvider = { provide: AccountServiceKey, useClass: AccountServiceImplementation };
const customerGroupServiceProvider = { provide: CustomerGroupServiceKey, useClass: CustomerGroupServiceImplementation };
const customerPriceListServiceProvider = { provide: CustomerPriceListServiceKey, useClass: CustomerPriceListServiceImplementation };
const customerProductPriceServiceProvider = { provide: CustomerProductPriceServiceKey, useClass: CustomerProductPriceServiceImplementation };
const translationServiceProvider = { provide: TranslationServiceKey, useClass: TranslationServiceImplementation };
const languageServiceProvider = { provide: LanguagesServiceKey, useClass: LanguagesServiceImplementation };
const productQuantityOnHandServiceProvider = { provide: ProductQuantityOnHandServiceKey, useClass: ProductQuantityOnHandServiceImplementation };
const productReceiptLineServiceProvider = { provide: ProductReceiptLineServiceKey, useClass: ProductReceiptLineServiceImplementation };
const productReceiptServiceProvider = { provide: ProductReceiptServiceKey, useClass: ProductReceiptServiceImplementation };
const warehouseServiceProvider = { provide: WarehouseServiceKey, useClass: WarehouseServiceImplementation };
const productIssueLineServiceProvider = { provide: ProductIssueLineServiceKey, useClass: ProductIssueLineServiceImplementation };
const productIssueServiceProvider = { provide: ProductIssueServiceKey, useClass: ProductIssueServiceImplementation };
const fifoCostsOfGoodsSoldServiceProvider = { provide: FifoCostsOfGoodsSoldServiceKey, useClass: FifoCostsOfGoodsSoldService };
const customerOrderServiceProvider = { provide: CustomerOrderServiceKey, useClass: CustomerOrderServiceImplementation };

const providers = [
  orderServiceProvider,
  modelConfigurationProvider,
  salesInvoiceServiceProvider,
  userServiceProvider,
  customerServiceProvider,
  addressServiceProvider,
  organizationServiceProvider,
  bankAccountServiceProvider,
  bankServiceProvider,
  countryServiceProvider,
  calendarActivityServiceProvider,
  currencyServiceProvider,
  accountingSchemeServiceProvider,
  salesInvoiceLineServiceProvider,
  taxServiceProvider,
  salesInvoiceVatServiceProvider,
  userToOrganizationServiceProvider,
  taskServiceProvider,
  leadServiceProvider,
  prospectServiceProvider,
  suspectServiceProvider,
  productServiceProvider,
  currencyRateServiceProvider,
  recurringSalesInvoiceServiceProvider,
  recurringSalesInvoiceLineServiceProvider,
  accountServiceProvider,
  customerGroupServiceProvider,
  customerPriceListServiceProvider,
  customerProductPriceServiceProvider,
  translationServiceProvider,
  languageServiceProvider,
  productQuantityOnHandServiceProvider,
  productReceiptLineServiceProvider,
  productReceiptServiceProvider,
  warehouseServiceProvider,
  productIssueLineServiceProvider,
  productIssueServiceProvider,
  fifoCostsOfGoodsSoldServiceProvider,
  customerOrderServiceProvider,
];

const ENTITY_MANAGER_ID = '##entityManager##';

@Module({
  imports: [],
  providers,
  exports: providers,
})
export class ModelModule {
  static _injector: Injector;

  static getInjector(): Injector {
    return ModelModule._injector;
  }

  static setInjector(injector: Injector) {
    ModelModule._injector = injector;
  }

  static setEntityManager(entityManager:EntityManager) {
    Session.set(ENTITY_MANAGER_ID, entityManager);
  }
  static getEntityManager(): EntityManager {
    return Session.get(ENTITY_MANAGER_ID);
  }
}
