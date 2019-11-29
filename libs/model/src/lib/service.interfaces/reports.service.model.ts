import { SalesInvoiceModel } from '../entities/sales.invoice.model';

export interface ReportsServiceModel {
  printSalesInvoice(data: SalesInvoiceModel);
}
