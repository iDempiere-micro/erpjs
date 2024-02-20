import { Field, InputType } from '@nestjs/graphql';
import { ContactPersonCompanyRelationSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class ContactPersonCompanyRelationSaveArgs
  extends BaseSaveArgs
  implements ContactPersonCompanyRelationSaveArgsModel
{
  @Field()
  contactPersonId: number;
  @Field()
  customerId: number;
  @Field()
  isActive: boolean;
  @Field()
  role: string;
}
