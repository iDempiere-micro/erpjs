import { Field, InputType } from 'type-graphql';
import { BaseSaveArgs } from './base.save.args';
import { TaxSaveArgsModel } from '@erpjs/model';

@InputType()
export class TaxSaveArgs extends BaseSaveArgs implements TaxSaveArgsModel {
  @Field()
  displayName: string;
  @Field()
  ratePercent: number;
}
