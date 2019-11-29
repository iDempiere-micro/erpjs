import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericEntityService } from './services/genericEntity.service';
import { Address } from './entities/address';
import { Country } from './entities/country';
import { ModelModule } from './model/model.module';
import { Customer } from './entities/customer';
import { Organization } from './entities/organization';
import { VatRegistration } from './entities/vat.registration';
import { SalesInvoice } from './entities/sales.invoice';
import { Currency } from './entities/currency';
import { SalesInvoiceLine } from './entities/sales.invoice.line';
import { Product } from './entities/product';
import { Account } from './entities/account';
import { BankAccount } from './entities/bank.account';
import { Bank } from './entities/bank';
import { Tax } from './entities/tax';
import { MigrationService } from './services/migration.service';
import { AccountingScheme } from './entities/accounting.scheme';
import { SalesInvoiceVat } from './entities/sales.invoice.vat';
import { DocumentNumberSequence } from './entities/document.number.sequence';
import { UserIdentity } from './entities/user.identity';
import { AppUser } from './entities/app.user';
import { UserToOrganization } from './entities/user.to.organization';
import { EverythingSubscriber } from './subscriber/everything.subscriber';
import { HistoryService } from './services/history.service';
import { Task } from './entities/task';
import { CalendarActivity } from './entities/calendar.activity';
import { WorkLog } from './entities/work.log';
import { Project } from './entities/project';
import { Lead } from './entities/lead';
import { Suspect } from './entities/suspect';
import { Prospect } from './entities/prospect';
import { Opportunity } from './entities/opportunity';
import { VendorInvoice } from './entities/vendor.invoice';
import { VendorInvoiceVat } from './entities/vendor.invoice.vat';
import { Vendor } from './entities/vendor';
import { CurrencyRate } from './entities/currency.rate';
import { RecurringSalesInvoiceLine } from './entities/recurring.sales.invoice.line';
import { RecurringSalesInvoice } from './entities/recurring.sales.invoice';

export const entities = [
  Address,
  Country,
  Customer,
  Organization,
  VatRegistration,
  SalesInvoice,
  Currency,
  SalesInvoiceLine,
  Product,
  Account,
  BankAccount,
  Bank,
  Tax,
  AccountingScheme,
  SalesInvoiceVat,
  DocumentNumberSequence,
  UserIdentity,
  AppUser,
  UserToOrganization,
  Task,
  CalendarActivity,
  WorkLog,
  Project,
  Lead,
  Suspect,
  Prospect,
  Opportunity,
  Vendor,
  VendorInvoice,
  VendorInvoiceVat,
  CurrencyRate,
  RecurringSalesInvoiceLine,
  RecurringSalesInvoice,
];

export const migrations = [
];

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    ModelModule
  ],

  providers: [
    GenericEntityService,
    MigrationService,
    EverythingSubscriber,
    HistoryService,
  ],

  exports: [
    GenericEntityService
  ],
})
export class EntityModule { }
