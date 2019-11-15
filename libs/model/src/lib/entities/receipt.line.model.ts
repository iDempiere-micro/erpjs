import { BaseModel } from './base.model';
import { ProductQuantityPriceTaxModel } from '../helpers/product.quantity.price.tax.model';
import { WarehouseModel } from './warehouse.model';

export interface ReceiptLineModel extends BaseModel, ProductQuantityPriceTaxModel {
  warehouse: WarehouseModel;
  quantityOnHand: number;
  receiptDate: Date;
}
