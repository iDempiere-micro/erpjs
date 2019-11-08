import { Field, InputType } from 'type-graphql';
import { InvoiceSaveArgsModel } from '@erpjs/model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class InvoiceSaveArgs extends BaseSaveArgs implements InvoiceSaveArgsModel {
  @Field()
  dueDate: Date;
}
