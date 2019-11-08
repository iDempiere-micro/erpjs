import { ProductQuantityPriceModel, TaxModel } from '../..';

export interface ProductQuantityPriceTaxModel extends ProductQuantityPriceModel {
  narration: string;
  lineTax: Promise<TaxModel>
}
