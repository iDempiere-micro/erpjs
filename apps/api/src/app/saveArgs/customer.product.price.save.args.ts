import { BaseSaveArgs } from './base.save.args';
import { CustomerProductPriceSaveArgsModel } from '../../model';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerProductPriceSaveArgs extends BaseSaveArgs
  implements CustomerProductPriceSaveArgsModel {
  @Field()
  customerPriceListDisplayName: string;
  @Field()
  productSKU: string;
  @Field()
  sellingPrice: number;
}
