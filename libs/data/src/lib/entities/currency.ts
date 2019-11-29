import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { CurrencyModel, CurrencyRateModel, LeadModel, OpportunityModel } from '@erpjs/model';
import { SalesInvoice } from './sales.invoice';
import { AccountingScheme } from './accounting.scheme';
import { Lead, Opportunity, VendorInvoice } from '@erpjs/data';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';
import { CurrencyRate } from './currency.rate';

@Entity()
@ObjectType()
export class Currency extends UniqueDisplayEntityBase implements CurrencyModel {
  @Column()
  @Field()
  isoCode: string;

  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.currency)
  salesInvoices: Promise<Array<SalesInvoice>>;

  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.currency)
  recurringSalesInvoices: Promise<Array<SalesInvoice>>;

  @Field(type => [CurrencyRate], { nullable: true })
  @OneToMany(type => CurrencyRate, currencyRate => currencyRate.from)
  currencyRatesFrom: Promise<Array<CurrencyRateModel>>;

  @Field(type => [CurrencyRate], { nullable: true })
  @OneToMany(type => CurrencyRate, currencyRate => currencyRate.to)
  currencyRatesTo: Promise<Array<CurrencyRateModel>>;

  @OneToMany(type => AccountingScheme, accountingScheme => accountingScheme.currency)
  accountingSchemas: Promise<Array<AccountingScheme>>;

  @OneToMany(type => Lead, lead => lead.currency)
  leads: Promise<Array<LeadModel>>;

  @OneToMany(type => Opportunity, opportunity => opportunity.currency)
  opportunities: Promise<Array<OpportunityModel>>;

  @OneToMany(type => VendorInvoice, vendorInvoice => vendorInvoice.currency)
  vendorInvoices: Promise<Array<VendorInvoice>>;
}
