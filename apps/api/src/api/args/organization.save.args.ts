import { Field, InputType } from 'type-graphql';
import { BaseSaveArgs } from './base.save.args';
import { AccountingSchemeModel, AddressSaveArgsModel, OrganizationSaveArgsModel } from '@erpjs/model';
import { AddressSaveArgs } from './address.save.args';

@InputType()
export class OrganizationSaveArgs extends BaseSaveArgs implements OrganizationSaveArgsModel {
  @Field()
  accountingSchemeId: number;
  accountingScheme?: AccountingSchemeModel;
  @Field()
  bankAccountId: number;
  @Field()
  contact: string;
  @Field()
  displayName: string;
  @Field()
  idNumber: string;
  @Field(type => AddressSaveArgs)
  legalAddress: AddressSaveArgsModel;
  @Field()
  legalName: string;
  @Field()
  registration: string;
}
