import { BaseSaveArgsModel } from './base.save.args.model';
import { SalesInvoiceModel } from './sales.invoice.model';

export interface SalesInvoiceVatSaveArgsModel extends BaseSaveArgsModel {
  vatRatePercent: number;
  vatTotalRaw: number;
  vatTotalAccountingSchemeCurrencyRaw: number;
  vatTotal: number;
  vatTotalAccountingSchemeCurrency: number;
  invoice: SalesInvoiceModel;
}

export interface SalesInvoicePublishArgsModel {
  id?: any;
  attachmentIds: string[];
}
