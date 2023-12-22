import { Field, InputType } from '@nestjs/graphql';
import { SalesInvoiceLineSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class SalesInvoiceLineSaveArgs
  extends BaseSaveArgs
  implements SalesInvoiceLineSaveArgsModel
{
  @Field()
  lineOrder: number;
  @Field()
  linePrice: number;
  @Field({ nullable: true })
  lineTaxId?: number;
  @Field()
  lineTaxIsStandard: boolean;
  @Field()
  narration: string;
  @Field()
  productId: number;
  @Field()
  quantity: number;
}
