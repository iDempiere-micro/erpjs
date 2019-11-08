import { BaseModel } from './base.model';
import { ProductQuantityPriceTaxModel, WarehouseModel } from '../..';

export interface ReceiptLineModel extends BaseModel, ProductQuantityPriceTaxModel {
  warehouse: WarehouseModel;
  quantityOnHand: number;
  receiptDate: Date;
}
