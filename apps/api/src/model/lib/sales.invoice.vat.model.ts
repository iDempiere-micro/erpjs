import { BaseModel } from './base.model';
import { SalesInvoiceModel } from './sales.invoice.model';

export interface SalesInvoiceVatModel extends BaseModel {
  invoice: SalesInvoiceModel;
  vatRatePercent: number;
  vatTotalRaw: number;
  vatTotalAccountingSchemeCurrencyRaw: number;
  vatTotal: number;
  vatTotalAccountingSchemeCurrency: number;
}
