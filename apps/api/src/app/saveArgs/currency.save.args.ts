import { Field, InputType } from '@nestjs/graphql';
import { BaseSaveArgs } from './base.save.args';
import { CurrencySaveArgsModel } from '../../model';

@InputType()
export class CurrencySaveArgs extends BaseSaveArgs
  implements CurrencySaveArgsModel {
  @Field()
  displayName: string;
  @Field()
  isoCode: string;
}
