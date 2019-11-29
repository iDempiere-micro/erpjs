import { BaseSaveArgs } from './base.save.args';
import { ProductModel, SalesInvoiceLineSaveArgsModel, SalesInvoiceModel, TaxModel } from '@erpjs/model';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SalesInvoiceLineSaveArgs extends BaseSaveArgs implements SalesInvoiceLineSaveArgsModel {
  @Field({nullable:true})
  invoiceId?: number;
  invoice?: SalesInvoiceModel;
  @Field()
  lineOrder: number;
  @Field()
  linePrice: number;
  @Field()
  lineTaxId?: number;
  lineTax?: TaxModel;
  @Field()
  narration: string;
  @Field()
  productId?: number;
  product?: ProductModel;
  @Field()
  quantity: number;
}
