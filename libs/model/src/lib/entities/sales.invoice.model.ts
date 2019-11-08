import {
  BaseModel,
  HasBankAccount,
  HasCurrency,
  HasCustomer,
  HasDocumentNo,
  HasDueDate,
  HasGrandTotal,
  HasIssuedOn,
  HasOrganization,
  HasProductsQuantitiesPricesTaxes,
  HasTotalLines,
  SalesInvoiceVatModel,
  TransactionModel,
  WasPrinted
} from '../..';

export interface SalesInvoiceModel extends BaseModel, HasProductsQuantitiesPricesTaxes,
  HasCustomer, HasCurrency, HasTotalLines, HasGrandTotal, TransactionModel,
  HasOrganization, HasDueDate, HasBankAccount, HasIssuedOn, HasDocumentNo,
  WasPrinted {
  currencyMultiplyingRateToAccountingSchemeCurrency: number;
  vatReport: Promise<Array<SalesInvoiceVatModel>>;
}
