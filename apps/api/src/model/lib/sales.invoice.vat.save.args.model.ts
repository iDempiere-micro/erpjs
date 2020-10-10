import { SalesInvoiceModel } from './sales.invoice.model';
import { BaseSaveArgsModel } from './base.save.args.model';

export interface SalesInvoiceVatSaveArgsModel extends BaseSaveArgsModel {
  vatRatePercent: number;
  vatTotalRaw: number;
  vatTotalAccountingSchemeCurrencyRaw: number;
  vatTotal: number;
  vatTotalAccountingSchemeCurrency: number;
  invoice: SalesInvoiceModel;
}
