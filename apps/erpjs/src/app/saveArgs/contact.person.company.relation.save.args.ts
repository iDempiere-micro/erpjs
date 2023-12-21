import { BaseSaveArgs } from './base.save.args';
import { ContactPersonCompanyRelationSaveArgsModel } from '../../model';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContactPersonCompanyRelationSaveArgs extends BaseSaveArgs
  implements ContactPersonCompanyRelationSaveArgsModel {
  @Field()
  contactPersonId: number;
  @Field()
  customerId: number;
  @Field()
  isActive: boolean;
  @Field()
  role: string;
}
