import { Field, InputType } from '@nestjs/graphql';
import { ContactPersonSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class ContactPersonSaveArgs
  extends BaseSaveArgs
  implements ContactPersonSaveArgsModel
{
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}
