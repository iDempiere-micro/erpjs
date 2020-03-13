import { BaseModel } from './base.model';
import { ProductModel } from './product.model';
import { ProductMovementModel } from '../helpers/product.movement.model';

export interface ProductQuantityOnHandHistoryModel extends BaseModel {
  product: Promise<ProductModel>
  quantityBefore: number
  quantityAfter: number
  productMovement: ProductMovementModel
  date: Date
}
