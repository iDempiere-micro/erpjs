import { Field, InputType } from 'type-graphql';
import { CustomerSaveArgsModel } from '@erpjs/model';
import { AddressSaveArgs } from './address.save.args';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class CustomerSaveArgs extends BaseSaveArgs implements CustomerSaveArgsModel {
  @Field()
  legalAddress: AddressSaveArgs;
  @Field()
  displayName: string;
  @Field({nullable: true})
  vatNumber?: string;
  @Field()
  legalName: string;
  @Field()
  invoicingEmail: string;
}
