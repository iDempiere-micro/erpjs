import { BaseModel } from './base.model';
import { ProductReceiptLineModel } from './product.receipt.line.model';
import { WarehouseModel } from './warehouse.model';

export interface ProductReceiptModel extends BaseModel {
  lines: Promise<ProductReceiptLineModel[]>
  warehouse: Promise<WarehouseModel>;
  isConfirmed: boolean;
  receiptDate: Date;
}
