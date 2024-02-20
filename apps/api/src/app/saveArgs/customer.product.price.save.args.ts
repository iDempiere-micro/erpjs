import { Field, InputType } from '@nestjs/graphql';
import { CustomerProductPriceSaveArgsModel } from '../../model';
import { CustomerPriceList } from '../../model/generated/entities/CustomerPriceList';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class CustomerProductPriceSaveArgs
  extends BaseSaveArgs
  implements CustomerProductPriceSaveArgsModel
{
  @Field()
  productId: number;
  @Field()
  sellingPrice: number;
  @Field()
  customerPriceListId?: number;
  customerPriceList?: CustomerPriceList;
  @Field()
  currencyId: number;
}
