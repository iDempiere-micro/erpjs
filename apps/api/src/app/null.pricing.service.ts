import {
  HasProductsQuantities,
  HasProductsQuantitiesPricesTaxes,
  HasSalesStage,
  PricingServiceModel
} from '@erpjs/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NullPricingService implements PricingServiceModel {
  calcProductPrices(from: HasProductsQuantities, inStage: HasSalesStage): Promise<HasProductsQuantitiesPricesTaxes> {
    return Promise.resolve(
      { lines: Promise.resolve( [ { product: undefined, quantity: 0, linePrice: -1, lineTax: null, narration: null } ] ) }
    );
  }
}
