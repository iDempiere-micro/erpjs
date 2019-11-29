import { BaseSaveArgsModel } from './base.save.args.model';
import { ProductModel } from '../entities/product.model';
import { TaxModel } from '../entities/tax.model';
import { RecurringSalesInvoiceModel } from '../entities/recurring.sales.invoice.model';

export interface RecurringSalesInvoiceLineSaveArgsModel  extends BaseSaveArgsModel {
  narration: string;
  linePrice: number;
  invoice: RecurringSalesInvoiceModel;
  product: ProductModel;
  quantity: number;
  lineTax: TaxModel;
  lineOrder: number;
}
