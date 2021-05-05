import { CountryService, CountryServiceKey } from './lib/country.service';
import {
  AccountingSchemeService,
  AccountingSchemeServiceKey,
} from './lib/accounting.scheme.service';
import { AddressService, AddressServiceKey } from './lib/address.service';
import {
  BankAccountService,
  BankAccountServiceKey,
} from './lib/bank.account.service';
import { BankService, BankServiceKey } from './lib/bank.service';
import { CurrencyService, CurrencyServiceKey } from './lib/currency.service';
import {
  CurrencyRateService,
  CurrencyRateServiceKey,
} from './lib/currency.rate.service';
import { CustomerService, CustomerServiceKey } from './lib/customer.service';
import {
  DocumentNumberingService,
  DocumentNumberingServiceKey,
} from './lib/document.numbering.service';
import { LanguagesService, LanguagesServiceKey } from './lib/languages.service';
import {
  OrganizationService,
  OrganizationServiceKey,
} from './lib/organization.service';
import { ProductService, ProductServiceKey } from './lib/product.service';
import { ReportsService, ReportsServiceKey } from './lib/reports.service';
import {
  SalesInvoiceLineService,
  SalesInvoiceLineServiceKey,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
} from './lib/sales.invoice.service';
import {
  SalesInvoiceVatService,
  SalesInvoiceVatServiceKey,
} from './lib/sales.invoice.vat.service';
import { TaxService, TaxServiceKey } from './lib/tax.service';
import {
  TranslationService,
  TranslationServiceKey,
} from './lib/translation.service';
import { DateService, DateServiceKey } from './lib/date.service';
import { UserService, UserServiceKey } from './lib/user.service';
import {
  SaveArgsValidationService,
  SaveArgsValidationServiceKey,
} from './lib/save.args.validation.service';
import {
  UnitOfMeasurementService,
  UnitOfMeasurementServiceKey,
} from './lib/unit.of.measurement.service';
import {
  CustomerGroupService,
  CustomerGroupServiceKey,
} from './lib/customer.group.service';
import {
  CustomerPriceListService,
  CustomerPriceListServiceKey,
} from './lib/customer.price.list.service';
import {
  CustomerProductPriceService,
  CustomerProductPriceServiceKey,
} from './lib/customer.product.price.service';
import {
  ContactPersonService,
  ContactPersonServiceKey,
} from './lib/contact.person.service';
import {
  ContactPersonCompanyRelationService,
  ContactPersonCompanyRelationServiceKey,
} from './lib/contact.person.company.relation.service';
import {
  FactoringProviderService,
  FactoringProviderServiceKey,
} from './lib/factoring.provider.service';
import {
  FactoringContractService,
  FactoringContractServiceKey,
} from './lib/factoring.contract.service';
import { MailService, MailServiceKey } from './lib/mail.service';
import { EventLogService, EventLogServiceKey } from './lib/eventLog.service';

const accountingSchemeServiceProvider = {
  provide: AccountingSchemeServiceKey,
  useClass: AccountingSchemeService,
};

const addressServiceProvider = {
  provide: AddressServiceKey,
  useClass: AddressService,
};

const bankAccountServiceProvider = {
  provide: BankAccountServiceKey,
  useClass: BankAccountService,
};

const bankServiceProvider = {
  provide: BankServiceKey,
  useClass: BankService,
};

const countryServiceProvider = {
  provide: CountryServiceKey,
  useClass: CountryService,
};

const currencyServiceProvider = {
  provide: CurrencyServiceKey,
  useClass: CurrencyService,
};

const currencyRateServiceProvider = {
  provide: CurrencyRateServiceKey,
  useClass: CurrencyRateService,
};

const customerServiceProvider = {
  provide: CustomerServiceKey,
  useClass: CustomerService,
};

const documentNumberingServiceProvider = {
  provide: DocumentNumberingServiceKey,
  useClass: DocumentNumberingService,
};

const languagesServiceProvider = {
  provide: LanguagesServiceKey,
  useClass: LanguagesService,
};

const organizationServiceProvider = {
  provide: OrganizationServiceKey,
  useClass: OrganizationService,
};

const productServiceProvider = {
  provide: ProductServiceKey,
  useClass: ProductService,
};

const reportsServiceProvider = {
  provide: ReportsServiceKey,
  useClass: ReportsService,
};

const salesInvoiceLineServiceProvider = {
  provide: SalesInvoiceLineServiceKey,
  useClass: SalesInvoiceLineService,
};

const salesInvoiceServiceProvider = {
  provide: SalesInvoiceServiceKey,
  useClass: SalesInvoiceService,
};

const salesInvoiceVatServiceProvider = {
  provide: SalesInvoiceVatServiceKey,
  useClass: SalesInvoiceVatService,
};

const taxServiceProvider = {
  provide: TaxServiceKey,
  useClass: TaxService,
};

const translationServiceProvider = {
  provide: TranslationServiceKey,
  useClass: TranslationService,
};

const dateServiceProvider = {
  provide: DateServiceKey,
  useClass: DateService,
};

const userServiceProvider = {
  provide: UserServiceKey,
  useClass: UserService,
};

const saveArgsValidationServiceProvider = {
  provide: SaveArgsValidationServiceKey,
  useClass: SaveArgsValidationService,
};

const unitOfMeasurementServiceProvider = {
  provide: UnitOfMeasurementServiceKey,
  useClass: UnitOfMeasurementService,
};

const customerGroupServiceProvider = {
  provide: CustomerGroupServiceKey,
  useClass: CustomerGroupService,
};

const customerPriceListServiceProvider = {
  provide: CustomerPriceListServiceKey,
  useClass: CustomerPriceListService,
};

const customerProductPriceServiceProvider = {
  provide: CustomerProductPriceServiceKey,
  useClass: CustomerProductPriceService,
};

const contactPersonServiceProvider = {
  provide: ContactPersonServiceKey,
  useClass: ContactPersonService,
};

const contactPersonCompanyRelationServiceProvider = {
  provide: ContactPersonCompanyRelationServiceKey,
  useClass: ContactPersonCompanyRelationService,
};

const factoringProviderServiceProvider = {
  provide: FactoringProviderServiceKey,
  useClass: FactoringProviderService,
};

const factoringContractServiceProvider = {
  provide: FactoringContractServiceKey,
  useClass: FactoringContractService,
};

const mailServiceProvider = {
  provide: MailServiceKey,
  useClass: MailService,
};

const eventLogServiceProvider = {
  provide: EventLogServiceKey,
  useClass: EventLogService,
};

export const serviceProviders = [
  accountingSchemeServiceProvider,
  addressServiceProvider,
  bankAccountServiceProvider,
  bankServiceProvider,
  countryServiceProvider,
  currencyServiceProvider,
  currencyRateServiceProvider,
  customerServiceProvider,
  documentNumberingServiceProvider,
  languagesServiceProvider,
  organizationServiceProvider,
  productServiceProvider,
  reportsServiceProvider,
  salesInvoiceLineServiceProvider,
  salesInvoiceServiceProvider,
  salesInvoiceVatServiceProvider,
  taxServiceProvider,
  translationServiceProvider,
  dateServiceProvider,
  userServiceProvider,
  saveArgsValidationServiceProvider,
  unitOfMeasurementServiceProvider,
  customerGroupServiceProvider,
  customerPriceListServiceProvider,
  customerProductPriceServiceProvider,
  contactPersonServiceProvider,
  contactPersonCompanyRelationServiceProvider,
  factoringProviderServiceProvider,
  factoringContractServiceProvider,
  mailServiceProvider,
  eventLogServiceProvider,
];
