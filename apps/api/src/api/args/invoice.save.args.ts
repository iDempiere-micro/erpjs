import { Field, InputType } from 'type-graphql';
import {
  BankAccountModel,
  CurrencyModel,
  CustomerModel,
  OrganizationModel,
  ProductQuantityPriceTaxModel,
  SalesInvoiceSaveArgsModel
} from '@erpjs/model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class InvoiceSaveArgs extends BaseSaveArgs implements SalesInvoiceSaveArgsModel {
  @Field()
  lines: Array<ProductQuantityPriceTaxModel>;
  @Field()
  bankAccount: BankAccountModel;
  @Field()
  currency: CurrencyModel;
  @Field()
  customer: CustomerModel;
  @Field()
  organization: OrganizationModel;
  @Field()
  paymentTermInDays: number;
  @Field()
  transactionDate: Date;
  @Field()
  dueDate: Date;
}
