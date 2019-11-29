import {
  AccountingSchemeService,
  AccountingSchemeServiceKey,
  AccountService,
  AccountServiceKey,
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
  CurrencyRateService,
  CurrencyRateServiceKey,
  CurrencyService,
  CurrencyServiceKey,
  CustomerService,
  CustomerServiceKey,
  Injector,
  LeadService,
  LeadServiceKey,
  OrganizationService,
  OrganizationServiceKey,
  ProductService,
  ProductServiceKey,
  ProspectService,
  ProspectServiceKey,
  RecurringSalesInvoiceLineService,
  RecurringSalesInvoiceLineServiceKey,
  RecurringSalesInvoiceService,
  RecurringSalesInvoiceServiceKey,
  SalesInvoiceLineService,
  SalesInvoiceLineServiceKey,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
  SalesInvoiceVatService,
  SalesInvoiceVatServiceKey,
  SuspectService,
  SuspectServiceKey,
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
import { DocumentNumberingService } from '@erpjs/data';
import { ReportsService } from '../../../../libs/data/src/lib/services/reports.service';

@Injectable()
export class InjectorImplementation implements Injector {
  public readonly documentNumberingServiceModel = new DocumentNumberingService();
  public readonly reportsServiceModel = new ReportsService();

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
    @Inject(LeadServiceKey) public readonly leadService: LeadService,
    @Inject(SuspectServiceKey) public readonly suspectService: SuspectService,
    @Inject(ProspectServiceKey) public readonly prospectService: ProspectService,
    @Inject(ProductServiceKey) public readonly productService: ProductService,
    @Inject(CurrencyRateServiceKey) public readonly currencyRateService: CurrencyRateService,
    @Inject(RecurringSalesInvoiceServiceKey) public readonly recurringSalesInvoiceService: RecurringSalesInvoiceService,
    @Inject(RecurringSalesInvoiceLineServiceKey)
    public readonly recurringSalesInvoiceLineService: RecurringSalesInvoiceLineService,
    @Inject(AccountServiceKey) public readonly accountService: AccountService,
  ) {
    ModelModule.setInjector(this);
  }
}
