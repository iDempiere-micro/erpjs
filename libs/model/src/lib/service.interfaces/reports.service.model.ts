import { SalesInvoiceModel } from '../entities/sales.invoice.model';
import { LanguageModel } from '../entities/language.model';

export interface ReportsServiceModel {
  printSalesInvoice(data: SalesInvoiceModel, language: LanguageModel);
}
