import { ContactPersonSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';
import { Field, InputType } from '@nestjs/graphql';

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
