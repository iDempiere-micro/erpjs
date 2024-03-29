import { BankAccountModel } from './bank.account.model';
import { BaseModel } from './base.model';
import { CurrencyModel } from './currency.model';
import { CustomerModel } from './customer.model';
import { FactoringProviderModel } from './factoring.provider.model';
import { LanguageModel } from './language.model';
import { OrganizationModel } from './organization.model';
import { SalesInvoiceLineModel } from './sales.invoice.line.model';
import { SalesInvoiceVatModel } from './sales.invoice.vat.model';

export interface SalesInvoiceModel extends BaseModel {
  grandTotal: number;
  grandTotalAccountingSchemeCurrency: number;
  totalLines: number;
  totalLinesAccountingSchemeCurrency: number;
  currency: CurrencyModel;
  lines: Array<SalesInvoiceLineModel>;
  customer: CustomerModel;
  currencyMultiplyingRateToAccountingSchemeCurrency: number;
  vatReport: Array<SalesInvoiceVatModel>;
  isCalculated: boolean;
  isDraft: boolean;
  paymentTermInDays: number;
  reverseCharge: boolean;
  organization: OrganizationModel;
  dueDate: Date;
  bankAccount: BankAccountModel;
  issuedOn: Date;
  documentNo?: string;
  printed: boolean;
  printDate?: Date;
  printError?: string;
  content?: string;
  printLanguage: LanguageModel;
  transactionDate: Date;
  factoringProvider?: FactoringProviderModel;
  printNote?: string;
}
