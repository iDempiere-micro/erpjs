import { ProductQuantityPriceTaxModel } from './product.quantity.price.tax.model';

export interface HasProductsQuantitiesPricesTaxes {
  lines: Promise<Array<ProductQuantityPriceTaxModel>>;
}
