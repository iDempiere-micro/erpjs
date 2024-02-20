import { Field, InputType } from '@nestjs/graphql';
import { BankSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class BankSaveArgs extends BaseSaveArgs implements BankSaveArgsModel {
  @Field()
  displayName: string;
  @Field()
  bankIdentifierCode: string;
}
