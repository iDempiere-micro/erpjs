import { Module } from '@nestjs/common';
import { OrderServiceImplementation } from './order.service.implementation';
import { ModelConfigurationImplementation } from './model.configuration.implementation';
import { SalesInvoiceServiceImplementation } from './sales.invoice.service.implementation';
import { UserServiceImplementation } from './user.service.implementation';
import { CustomerServiceImplementation } from './customer.service.implementation';
import { Injector } from '@erpjs/model';
import { AddressServiceImplementation } from './address.service.implementation';
import { OrganizationServiceImplementation } from './organization.service.implementation';
import { BankAccountServiceImplementation } from './bank.account.service.implementation';
import { BankServiceImplementation } from './bank.service.implementation';
import { CountryServiceImplementation } from './country.service.implementation';
import { EntityManager } from 'typeorm';
import { Session } from '../session';

export const ORDER_SERVICE = 'OrderService';
export const USER_SERVICE = 'UserService';

const orderServiceProvider = { provide: ORDER_SERVICE, useClass: OrderServiceImplementation };
const modelConfigurationProvider = { provide: 'ModelConfiguration', useClass: ModelConfigurationImplementation };
const salesInvoiceServiceProvider = { provide: 'SalesInvoiceService', useClass: SalesInvoiceServiceImplementation };
const userServiceProvider = { provide: USER_SERVICE, useClass: UserServiceImplementation };
const customerServiceProvider = { provide: 'CustomerService', useClass: CustomerServiceImplementation };
const addressServiceProvider = { provide: 'AddressService', useClass: AddressServiceImplementation };
const organizationServiceProvider = { provide: 'OrganizationService', useClass: OrganizationServiceImplementation };
const bankAccountServiceProvider = { provide: 'BankAccountService', useClass: BankAccountServiceImplementation };
const bankServiceProvider = { provide: 'BankService', useClass: BankServiceImplementation };
const countryServiceProvider = { provide: 'CountryService', useClass: CountryServiceImplementation };

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
