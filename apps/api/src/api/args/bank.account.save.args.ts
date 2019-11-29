import { BaseSaveArgs } from './base.save.args';
import { BankAccountSaveArgsModel, BankModel } from '@erpjs/model';
import { Field, InputType } from 'type-graphql';

@InputType()
export class BankAccountSaveArgs extends BaseSaveArgs implements BankAccountSaveArgsModel {
  @Field()
  bankId: number;
  bank?: BankModel;
  @Field()
  bankAccountCustomerPrintableNumber: string;
  @Field()
  displayName: string;
  @Field()
  iban: string;
  @Field()
  swift: string;
}
