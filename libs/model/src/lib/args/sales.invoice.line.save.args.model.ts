import { BaseSaveArgsModel } from './base.save.args.model';
import { SalesInvoiceModel } from '../entities/sales.invoice.model';
import { ProductModel } from '../entities/product.model';
import { TaxModel } from '../entities/tax.model';

export interface SalesInvoiceLineSaveArgsModel  extends BaseSaveArgsModel {
  narration: string;
  linePrice: number;
  invoice: SalesInvoiceModel;
  lineOrder: number;
  product: ProductModel;
  quantity: number;
  lineTax: TaxModel;
}
