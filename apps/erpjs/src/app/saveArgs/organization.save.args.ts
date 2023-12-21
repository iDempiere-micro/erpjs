import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseSaveArgs } from './base.save.args';
import {
  AddressSaveArgsModel,
  BankAccountSaveArgsModel,
  OrganizationSaveArgsModel,
} from '../../model';
import { AddressSaveArgsType } from '../saveArgs';
import { BankAccountSaveArgs } from './bank.account.save.args';

@InputType()
export class OrganizationSaveArgs extends BaseSaveArgs
  implements OrganizationSaveArgsModel {
  @Field(() => Int)
  accountingSchemeId: number;
  @Field(() => BankAccountSaveArgs)
  newBankAccount: BankAccountSaveArgsModel;
  @Field()
  contact: string;
  @Field()
  displayName: string;
  @Field()
  idNumber: string;
  @Field(AddressSaveArgsType)
  legalAddress: AddressSaveArgsModel;
  @Field()
  legalName: string;
  @Field()
  registration: string;
  @Field({ nullable: true })
  vatNumber?: string;
  @Field()
  currentInvoiceDocumentNumber: number;
}
