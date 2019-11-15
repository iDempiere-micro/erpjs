import { ProductModel } from '../entities/product.model';

export interface ProductQuantityModel {
  product: Promise<ProductModel>;
  quantity: number;
}
