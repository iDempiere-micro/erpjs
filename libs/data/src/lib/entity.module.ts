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
