import { ProductQuantityPriceModel } from './product.quantity.price.model';
import { TaxModel } from '../entities/tax.model';

export interface ProductQuantityPriceTaxModel extends ProductQuantityPriceModel {
  narration: string;
  lineTax: Promise<TaxModel>
}
