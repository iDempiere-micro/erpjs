import { ProductQuantityModel } from './product.quantity.model';

export interface HasProductsQuantities {
  lines: Promise<Array<ProductQuantityModel>>;
}
