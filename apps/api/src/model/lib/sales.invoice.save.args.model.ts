import { BaseSaveArgsModel } from './base.save.args.model';
import { CurrencyModel } from './currency.model';
import { CustomerModel } from './customer.model';
import { OrganizationModel } from './organization.model';
import { SalesInvoiceLineSaveArgsModel } from './sales.invoice.line.save.args.model';

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
  currencyId?: number;
  lines: Array<SalesInvoiceLineSaveArgsModel>;
  factoringProviderId?: number;
}
