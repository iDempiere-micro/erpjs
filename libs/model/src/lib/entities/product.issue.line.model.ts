import { BaseModel } from './base.model';
import { ProductMovementDirection, WarehouseProductMovementModel } from '../helpers/product.movement.model';
import { ProductQuantityPriceModel } from '../helpers/product.quantity.price.model';
import { ProductIssueModel } from './product.issue.model';

export interface ProductIssueLineModel extends BaseModel, WarehouseProductMovementModel, ProductQuantityPriceModel {
  moveDirection: ProductMovementDirection.issue
  productIssue: Promise<ProductIssueModel>
}
