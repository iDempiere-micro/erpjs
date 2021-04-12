import { Field, InputType } from '@nestjs/graphql';
import { AccountingSchemeSaveArgsModel } from '../../model/lib/accounting.scheme.save.args.model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class AccountingSchemeSaveArgs extends BaseSaveArgs
  implements AccountingSchemeSaveArgsModel {
  @Field()
  displayName: string;
  @Field()
  currencyIsoCode?: string;
}
