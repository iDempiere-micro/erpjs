import { Field, InputType, Int } from '@nestjs/graphql';
import { AddressSaveArgs } from './address.save.args';
import { BaseSaveArgs } from './base.save.args';
import { CustomerSaveArgsModel } from '../../model';
import { AddressSaveArgsType } from '../saveArgs';

@InputType()
export class CustomerSaveArgs
  extends BaseSaveArgs
  implements CustomerSaveArgsModel
{
  @Field(AddressSaveArgsType)
  legalAddress: AddressSaveArgs;
  @Field(AddressSaveArgsType, { nullable: true })
  address?: AddressSaveArgs;
  @Field()
  displayName: string;
  @Field({ nullable: true })
  vatNumber?: string;
  @Field()
  legalName: string;
  @Field()
  invoicingEmail: string;
  @Field()
  idNumber: string;
  @Field({ nullable: true })
  note?: string;
  @Field(() => Int, { nullable: true })
  customerGroupId?: number;
}
