import { Field, InputType, Int } from '@nestjs/graphql';
import { SalesInvoiceSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';
import { SalesInvoiceLineSaveArgs } from './sales.invoice.line.save.args';

@InputType()
export class SalesInvoiceSaveArgs
  extends BaseSaveArgs
  implements SalesInvoiceSaveArgsModel
{
  @Field(() => Int)
  currencyId: number;

  @Field(() => Int)
  customerId: number;

  @Field()
  issuedOn: Date;

  @Field(() => [SalesInvoiceLineSaveArgs])
  lines: Array<SalesInvoiceLineSaveArgs>;

  @Field(() => Int)
  organizationId: number;

  @Field(() => Int)
  paymentTermInDays: number;

  @Field()
  transactionDate: Date;

  @Field(() => Int, { nullable: true })
  factoringProviderId?: number;
}
