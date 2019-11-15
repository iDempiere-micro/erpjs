import { HasProductsQuantities } from '../helpers/has.products.quantities';
import { HasSalesStage } from '../helpers/has.sales.stage';
import { HasProductsQuantitiesPricesTaxes } from '../helpers/has.products.quantities.prices.taxes';

export interface PricingServiceModel {
  calcProductPrices(from: HasProductsQuantities, inStage: HasSalesStage): Promise<HasProductsQuantitiesPricesTaxes>;
}
