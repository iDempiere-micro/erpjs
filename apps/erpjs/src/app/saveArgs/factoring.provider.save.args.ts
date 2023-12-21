import { Field, InputType } from '@nestjs/graphql';
import { BaseSaveArgs } from './base.save.args';
import {
  BankAccountSaveArgsModel,
  FactoringProviderSaveArgsModel,
} from '../../model';
import { BankAccountSaveArgs } from './bank.account.save.args';

@InputType()
export class FactoringProviderSaveArgs extends BaseSaveArgs
  implements FactoringProviderSaveArgsModel {
  @Field(() => BankAccountSaveArgs)
  newBankAccount: BankAccountSaveArgsModel;
  @Field()
  contact: string;
  @Field()
  displayName: string;
  @Field()
  legalName: string;
}
