import { Field, InputType } from '@nestjs/graphql';
import { BaseSaveArgs } from './base.save.args';
import { ProductSaveArgsModel } from '../../model';

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
