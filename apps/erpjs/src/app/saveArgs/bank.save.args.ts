import { Field, InputType } from '@nestjs/graphql';
import { BaseSaveArgs } from './base.save.args';
import { BankSaveArgsModel } from '../../model';

@InputType()
export class BankSaveArgs extends BaseSaveArgs implements BankSaveArgsModel {
  @Field()
  displayName: string;
  @Field()
  bankIdentifierCode: string;
}
