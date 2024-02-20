import { Field, InputType } from '@nestjs/graphql';
import { CurrencySaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class CurrencySaveArgs
  extends BaseSaveArgs
  implements CurrencySaveArgsModel
{
  @Field()
  displayName: string;
  @Field()
  isoCode: string;
}
