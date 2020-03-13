import { BaseModel } from './base.model';
import { HasProductsQuantitiesPricesTaxes } from '../helpers/has.products.quantities.prices.taxes';
import { HasCustomer } from '../helpers/has.customer';
import { HasCurrency } from '../helpers/has.currency';
import { HasTotalLines } from '../helpers/has.total.lines';
import { HasGrandTotal } from '../helpers/has.grand.total';
import { TransactionModel } from './transaction.model';
import { HasOrganization } from '../helpers/has.organization';
import { HasDueDate } from '../helpers/has.due.date';
import { HasBankAccount } from '../helpers/has.bank.account';
import { HasIssuedOn } from '../helpers/has.issued.on';
import { HasDocumentNo } from '../helpers/has.document.no';
import { WasPrinted } from '../helpers/was.printed';
import { SalesInvoiceVatModel } from './sales.invoice.vat.model';
import { CustomerOrderModel } from './customer.order.model';

export interface SalesInvoiceModel extends BaseModel, HasProductsQuantitiesPricesTaxes,
  HasCustomer, HasCurrency, HasTotalLines, HasGrandTotal, TransactionModel,
  HasOrganization, HasDueDate, HasBankAccount, HasIssuedOn, HasDocumentNo,
  WasPrinted {
  currencyMultiplyingRateToAccountingSchemeCurrency: number;
  vatReport: Promise<Array<SalesInvoiceVatModel>>;
  isCalculated: boolean;
  isDraft: boolean;
  paymentTermInDays: number;
  reverseCharge: boolean;
  originalOrder?: Promise<CustomerOrderModel>
}
