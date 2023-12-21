import { Field, InputType, Int } from '@nestjs/graphql';
import { AccountingSchemeSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class AccountingSchemeSaveArgs extends BaseSaveArgs
  implements AccountingSchemeSaveArgsModel {
  @Field()
  displayName: string;
  @Field(() => Int)
  currencyId: number;
}
