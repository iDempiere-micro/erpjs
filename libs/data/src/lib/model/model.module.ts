import { Module } from '@nestjs/common';
import { OrderServiceImplementation } from './order.service.implementation';
import { ModelConfigurationImplementation } from './model.configuration.implementation';
import { SalesInvoiceServiceImplementation } from './sales.invoice.service.implementation';
import { UserServiceImplementation } from './user.service.implementation';
import { CustomerServiceImplementation } from './customer.service.implementation';
import {
  AccountingSchemeServiceKey,
  AddressServiceKey,
  BankAccountServiceKey,
  BankServiceKey,
  CalendarActivityServiceKey,
  CountryServiceKey,
  CurrencyServiceKey,
  CustomerServiceKey,
  Injector,
  OrganizationServiceKey,
  SalesInvoiceLineServiceKey,
  SalesInvoiceServiceKey,
  SalesInvoiceVatServiceKey,
  TaskServiceKey,
  TaxServiceKey,
  UserServiceKey,
  UserToOrganizationServiceKey
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
