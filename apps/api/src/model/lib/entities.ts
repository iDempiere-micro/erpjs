import { AccountingScheme } from '../generated/entities/AccountingScheme';
import { Address } from '../generated/entities/Address';
import { Attachment } from '../generated/entities/Attachment';
import { Bank } from '../generated/entities/Bank';
import { BankAccount } from '../generated/entities/BankAccount';
import { Config } from '../generated/entities/Config';
import { ContactPerson } from '../generated/entities/ContactPerson';
import { ContactPersonCompanyRelation } from '../generated/entities/ContactPersonCompanyRelation';
import { Country } from '../generated/entities/Country';
import { Currency } from '../generated/entities/Currency';
import { CurrencyRate } from '../generated/entities/CurrencyRate';
import { Customer } from '../generated/entities/Customer';
import { CustomerGroup } from '../generated/entities/CustomerGroup';
import { CustomerPriceList } from '../generated/entities/CustomerPriceList';
import { CustomerProductPrice } from '../generated/entities/CustomerProductPrice';
import { DocumentNumberSequence } from '../generated/entities/DocumentNumberSequence';
import { EventLog } from '../generated/entities/EventLog';
import { FactoringContract } from '../generated/entities/FactoringContract';
import { FactoringProvider } from '../generated/entities/FactoringProvider';
import { Language } from '../generated/entities/Language';
import { Menu } from '../generated/entities/Menu';
import { MenuItem } from '../generated/entities/MenuItem';
import { Organization } from '../generated/entities/Organization';
import { Product } from '../generated/entities/Product';
import { SalesInvoice } from '../generated/entities/SalesInvoice';
import { SalesInvoiceLine } from '../generated/entities/SalesInvoiceLine';
import { SalesInvoiceVat } from '../generated/entities/SalesInvoiceVat';
import { Tax } from '../generated/entities/Tax';
import { UnitOfMeasurement } from '../generated/entities/UnitOfMeasurement';
import { UnitOfMeasurementConversion } from '../generated/entities/UnitOfMeasurementConversion';
import { User } from '../generated/entities/User';
import { UserIdentity } from '../generated/entities/UserIdentity';
import { UserToOrganization } from '../generated/entities/UserToOrganization';

export const entities = [
  Address,
  Country,
  Organization,
  SalesInvoiceVat,
  SalesInvoice,
  Currency,
  AccountingScheme,
  Customer,
  Bank,
  BankAccount,
  CurrencyRate,
  DocumentNumberSequence,
  Tax,
  SalesInvoiceLine,
  Product,
  User,
  UserToOrganization,
  UserIdentity,
  Language,
  MenuItem,
  Menu,
  UnitOfMeasurement,
  UnitOfMeasurementConversion,
  CustomerGroup,
  CustomerPriceList,
  CustomerProductPrice,
  ContactPerson,
  ContactPersonCompanyRelation,
  FactoringProvider,
  FactoringContract,
  EventLog,
  Config,
  Attachment,
];
