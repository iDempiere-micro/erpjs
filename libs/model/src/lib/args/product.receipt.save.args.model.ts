import { BaseSaveArgsModel } from './base.save.args.model';
import { ProductModel } from '../entities/product.model';
import { TaxModel } from '../entities/tax.model';
import { ProductReceiptModel } from '../entities/product.receipt.model';
import { WarehouseModel } from '../entities/warehouse.model';

export interface ProductReceiptLineSaveModel extends BaseSaveArgsModel {
  product: ProductModel
  quantity: number
  linePrice: number
  lineTax: TaxModel
}

export interface ProductReceiptLineSaveArgsModel extends ProductReceiptLineSaveModel {
  productReceipt: ProductReceiptModel
  movementDate: Date
}

export interface ProductReceiptSaveArgsModel extends BaseSaveArgsModel {
  warehouse: WarehouseModel
  movementDate: Date
  lines: Array<ProductReceiptLineSaveModel>
}
