import { BaseModel } from './base.model';
import { VendorInvoiceModel } from './vendor.invoice.model';

export interface VendorInvoiceVatModel extends BaseModel {
  invoice: Promise<VendorInvoiceModel>;
  vatRatePercent: number;
  vatTotalAccountingSchemeCurrency: number;
}
