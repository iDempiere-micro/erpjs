import { Field, InputType } from '@nestjs/graphql';
import { CountrySaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class CountrySaveArgs
  extends BaseSaveArgs
  implements CountrySaveArgsModel
{
  @Field()
  displayName: string;
  @Field()
  isoCode: string;
}
