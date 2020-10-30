import { Field, InputType } from '@nestjs/graphql';
import { AddressSaveArgs } from './address.save.args';
import { BaseSaveArgs } from './base.save.args';
import { CustomerSaveArgsModel } from '../../model';

@InputType()
export class CustomerSaveArgs extends BaseSaveArgs
  implements CustomerSaveArgsModel {
  @Field()
  legalAddress: AddressSaveArgs;
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
}
