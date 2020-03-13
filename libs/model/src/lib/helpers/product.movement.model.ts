import { ProductModel } from '../entities/product.model';
import { WarehouseModel } from '../entities/warehouse.model';

export enum ProductMovementDirection {
  receipt,
  issue
}

export interface WarehouseProductMovementModel {
  product: Promise<ProductModel>
  quantity: number
  moveDirection: ProductMovementDirection
  movementDate: Date
}

export interface ProductMovementModel extends WarehouseProductMovementModel {
  warehouse: Promise<WarehouseModel>
}
