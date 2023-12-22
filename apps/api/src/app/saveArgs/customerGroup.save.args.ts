import { BaseSaveArgs } from './base.save.args';
import { CustomerGroupSaveArgsModel } from '../../model';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerGroupSaveArgs
  extends BaseSaveArgs
  implements CustomerGroupSaveArgsModel
{
  @Field()
  displayName: string;
}
