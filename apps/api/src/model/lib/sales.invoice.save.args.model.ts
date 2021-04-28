import { BaseSaveArgsModel } from './base.save.args.model';
import { SalesInvoiceLineSaveArgsModel } from './sales.invoice.line.save.args.model';
import { CustomerModel } from './customer.model';
import { CurrencyModel } from './currency.model';
import { OrganizationModel } from './organization.model';

export interface SalesInvoiceSaveArgsModel extends BaseSaveArgsModel {
  customer?: CustomerModel;
  customerDisplayName?: string;
  customerId?: number;
  organization?: OrganizationModel;
  organizationDisplayName?: string;
  organizationId?: number;
  paymentTermInDays: number;
  issuedOn: Date;
  transactionDate: Date;
  currency?: CurrencyModel;
  currencyIsoCode?: string;
  lines: Array<SalesInvoiceLineSaveArgsModel>;
  factoringProviderId?: number;
}
