import { Field, InputType } from '@nestjs/graphql';
import { BaseSaveArgs } from './base.save.args';
import { AddressSaveArgsModel, OrganizationSaveArgsModel } from '../../model';
import { AddressSaveArgsType } from '../saveArgs';

@InputType()
export class OrganizationSaveArgs extends BaseSaveArgs
  implements OrganizationSaveArgsModel {
  @Field()
  accountingSchemeId: number;
  @Field()
  bankAccountId: number;
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
}
