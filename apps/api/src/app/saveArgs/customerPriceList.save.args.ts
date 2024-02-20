import { Field, InputType } from '@nestjs/graphql';
import { CustomerPriceListSaveArgsModel, ProductPrice } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class ProductPriceSaveArgs implements ProductPrice {
  @Field()
  productId: number;
  @Field()
  currencyId: number;
  @Field()
  sellingPrice: number;
}

@InputType()
export class CustomerPriceListSaveArgs
  extends BaseSaveArgs
  implements CustomerPriceListSaveArgsModel
{
  @Field()
  customerGroupDisplayName: string;
  @Field()
  displayName: string;
  @Field(() => [ProductPriceSaveArgs])
  productPrices: Array<ProductPrice>;
  @Field()
  validFrom: Date;
  @Field()
  validTo: Date;
}
