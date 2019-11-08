import { ProductQuantityModel } from './product.quantity.model';

export interface ProductQuantityPriceModel extends ProductQuantityModel {
  linePrice: number;
}
