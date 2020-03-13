import { BaseModel } from './base.model';
import { ProductMovementDirection, WarehouseProductMovementModel } from '../helpers/product.movement.model';
import { ProductQuantityPriceTaxModel } from '../helpers/product.quantity.price.tax.model';
import { ProductReceiptModel } from './product.receipt.model';

export interface ProductReceiptLineModel extends BaseModel, WarehouseProductMovementModel, ProductQuantityPriceTaxModel {
  moveDirection: ProductMovementDirection.receipt
  quantityOnHand: number
  productReceipt: Promise<ProductReceiptModel>
}
