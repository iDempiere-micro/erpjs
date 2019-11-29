import { BaseSaveArgs } from './base.save.args';
import {
  BankAccountModel,
  CurrencyModel,
  CustomerModel,
  OrganizationModel,
  SalesInvoiceLineSaveArgsModel,
  SalesInvoiceSaveArgsModel
} from '@erpjs/model';
import { Field, InputType } from 'type-graphql';
import { SalesInvoiceLineSaveArgs } from './sales.invoice.line.save.args';

@InputType()
export class SalesInvoiceSaveArgs extends BaseSaveArgs implements SalesInvoiceSaveArgsModel {
  @Field()
  bankAccountDisplayName: string;
  bankAccount?: BankAccountModel;
  @Field()
  currencyIsoCode: string;
  currency: CurrencyModel;
  @Field()
  customerDisplayName: string;
  customer: CustomerModel;
  @Field()
  issuedOn: Date;
  @Field(type => [SalesInvoiceLineSaveArgs])
  lines: Array<SalesInvoiceLineSaveArgsModel>;
  @Field()
  organizationDisplayName: string;
  organization: OrganizationModel;
  @Field()
  paymentTermInDays: number;
  @Field()
  transactionDate: Date;
}
