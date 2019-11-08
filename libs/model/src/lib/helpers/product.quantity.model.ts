import { ProductModel } from '../..';

export interface ProductQuantityModel {
  product: Promise<ProductModel>;
  quantity: number;
}
