import { BaseModel } from './base.model';
import { ProductModel } from './product.model';
import { WarehouseModel } from './warehouse.model';

export interface ProductQuantityOnHandModel extends BaseModel {
  product: Promise<ProductModel>
  quantity: number
  warehouse: Promise<WarehouseModel>
}
