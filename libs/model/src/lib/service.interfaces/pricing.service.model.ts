import { HasProductsQuantities, HasProductsQuantitiesPricesTaxes, HasSalesStage } from '../..';

export interface PricingServiceModel {
  calcProductPrices(from: HasProductsQuantities, inStage: HasSalesStage): Promise<HasProductsQuantitiesPricesTaxes>;
}
