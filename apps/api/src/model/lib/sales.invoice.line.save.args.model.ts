import { BaseSaveArgsModel } from './base.save.args.model';
import { SalesInvoiceModel } from './sales.invoice.model';
import { ProductModel } from './product.model';
import { TaxModel } from './tax.model';

export interface SalesInvoiceLineSaveArgsModel extends BaseSaveArgsModel {
  narration: string;
  linePrice: number;
  invoice?: SalesInvoiceModel;
  invoiceId?: number;
  lineOrder: number;
  product?: ProductModel;
  productId?: number;
  productSku?: string;
  quantity: number;
  lineTax?: TaxModel;
  lineTaxId?: number;
  lineTaxIsStandard?: boolean;
}
