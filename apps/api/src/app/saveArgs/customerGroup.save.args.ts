import { Field, InputType } from '@nestjs/graphql';
import { CustomerGroupSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class CustomerGroupSaveArgs
  extends BaseSaveArgs
  implements CustomerGroupSaveArgsModel
{
  @Field()
  displayName: string;
}
