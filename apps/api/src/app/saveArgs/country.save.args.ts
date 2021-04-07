import { Field, InputType } from '@nestjs/graphql';
import { BaseSaveArgs } from './base.save.args';
import { CountrySaveArgsModel } from '../../model';

@InputType()
export class CountrySaveArgs extends BaseSaveArgs
  implements CountrySaveArgsModel {
  @Field()
  displayName: string;
  @Field()
  isoCode: string;
}
