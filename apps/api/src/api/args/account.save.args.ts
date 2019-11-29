import { BaseSaveArgs } from './base.save.args';
import { AccountingSchemeModel, AccountSaveArgsModel } from '@erpjs/model';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AccountSaveArgs extends BaseSaveArgs implements AccountSaveArgsModel {
  @Field()
  accountingSchemeId: number;
  accountingScheme: Promise<AccountingSchemeModel>;
  @Field()
  code: string;
  @Field()
  displayName: string;
}
