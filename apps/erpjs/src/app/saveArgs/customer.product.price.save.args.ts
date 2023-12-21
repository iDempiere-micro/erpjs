import { BaseSaveArgs } from './base.save.args';
import { CustomerProductPriceSaveArgsModel } from '../../model';
import { Field, InputType } from '@nestjs/graphql';
import { CustomerPriceList } from '../../model/generated/entities/CustomerPriceList';

@InputType()
export class CustomerProductPriceSaveArgs extends BaseSaveArgs
  implements CustomerProductPriceSaveArgsModel {
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
