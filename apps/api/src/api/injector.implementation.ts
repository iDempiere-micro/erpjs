import {
  AccountingSchemeService,
  AccountingSchemeServiceKey,
  AddressService,
  AddressServiceKey,
  BankAccountService,
  BankAccountServiceKey,
  BankService,
  BankServiceKey,
  CalendarActivityService,
  CalendarActivityServiceKey,
  CountryService,
  CountryServiceKey,
  CurrencyService,
  CurrencyServiceKey,
  CustomerService,
  CustomerServiceKey,
  Injector,
  OrganizationService,
  OrganizationServiceKey,
  SalesInvoiceLineService,
  SalesInvoiceLineServiceKey,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
  SalesInvoiceVatService,
  SalesInvoiceVatServiceKey,
  TaskService,
  TaskServiceKey,
  TaxService,
  TaxServiceKey,
  UserService,
  UserServiceKey,
  UserToOrganizationService,
  UserToOrganizationServiceKey
} from '@erpjs/model';
import { Inject, Injectable } from '@nestjs/common';
import { ModelModule } from '@erpjs/data';

@Injectable()
export class InjectorImplementation implements Injector {
  constructor(
    @Inject(AddressServiceKey) public readonly addressService: AddressService,
    @Inject(BankAccountServiceKey) public readonly bankAccountService: BankAccountService,
    @Inject(BankServiceKey) public readonly bankService: BankService,
    @Inject(CountryServiceKey) public readonly countryService: CountryService,
    @Inject(CustomerServiceKey) public readonly customerService: CustomerService,
    @Inject(OrganizationServiceKey) public readonly organizationService: OrganizationService,
    @Inject(CurrencyServiceKey) public readonly currencyService: CurrencyService,
    @Inject(AccountingSchemeServiceKey) public readonly accountingSchemeService: AccountingSchemeService,
    @Inject(SalesInvoiceServiceKey) public readonly salesInvoiceService: SalesInvoiceService,
    @Inject(SalesInvoiceLineServiceKey) public readonly salesInvoiceLineService: SalesInvoiceLineService,
    @Inject(TaxServiceKey) public readonly taxService: TaxService,
    @Inject(SalesInvoiceVatServiceKey) public readonly salesInvoiceVatService: SalesInvoiceVatService,
    @Inject(UserServiceKey) public readonly userService: UserService,
    @Inject(UserToOrganizationServiceKey) public readonly userToOrganizationService: UserToOrganizationService,
    @Inject(TaskServiceKey) public readonly taskService: TaskService,
    @Inject(CalendarActivityServiceKey) public readonly calendarActivityService: CalendarActivityService,
  ) {
    ModelModule.setInjector(this);
  }
}
