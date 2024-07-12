import { Field, InputType } from '@nestjs/graphql';
import { TaxSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class TaxSaveArgs extends BaseSaveArgs implements TaxSaveArgsModel {
  @Field()
  displayName: string;
  @Field()
  ratePercent: number;
  @Field()
  isStandard: boolean;
}
