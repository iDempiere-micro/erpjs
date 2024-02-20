import { Field, InputType } from '@nestjs/graphql';
import { ProductSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class ProductSaveArgs
  extends BaseSaveArgs
  implements ProductSaveArgsModel
{
  @Field()
  displayName: string;
  @Field()
  sku: string;
}
