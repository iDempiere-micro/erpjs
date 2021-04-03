import { Field, InputType, Int } from '@nestjs/graphql';
import { SalesInvoiceSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';
import { SalesInvoiceLineSaveArgs } from './sales.invoice.line.save.args';

@InputType()
export class SalesInvoiceSaveArgs extends BaseSaveArgs
  implements SalesInvoiceSaveArgsModel {
  @Field()
  currencyIsoCode: string;

  @Field()
  customerDisplayName: string;

  @Field()
  issuedOn: Date;

  @Field(() => [SalesInvoiceLineSaveArgs])
  lines: Array<SalesInvoiceLineSaveArgs>;

  @Field()
  organizationDisplayName: string;

  @Field(() => Int)
  paymentTermInDays: number;

  @Field()
  transactionDate: Date;
}
