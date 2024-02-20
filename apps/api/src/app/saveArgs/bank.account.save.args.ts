import { Field, InputType } from '@nestjs/graphql';
import { BankAccountSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class BankAccountSaveArgs
  extends BaseSaveArgs
  implements BankAccountSaveArgsModel
{
  @Field()
  bankAccountCustomerPrintableNumber: string;
  @Field()
  bankId: number;
  @Field()
  displayName: string;
  @Field()
  iban: string;
  @Field()
  swift: string;
}
