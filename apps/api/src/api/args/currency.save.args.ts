import { BaseSaveArgs } from './base.save.args';
import { CurrencySaveArgsModel } from '@erpjs/model';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CurrencySaveArgs extends BaseSaveArgs implements CurrencySaveArgsModel {
  @Field()
  isoCode: string;
  @Field()
  displayName: string;
}
