import { CanHaveVatRegistration } from './can.have.vat.registration';

export interface PrintSalesInvoice  {
  transactionDatePrintable: string;
  issuedOnPrintable: string;
  dueDatePrintable: string;
  invoiceNumber: string;
  payTo: string;
  iban: string;
  swift: string;
  seller: PrintSalesInvoiceParty;
  buyer: PrintSalesInvoiceParty;
  items: Array<PrintSalesInvoiceItem>;
  totalLines: string;
  grandTotal: string;
  currency: string;
  currencyMultiplyingRateToAccountingSchemeCurrency: string;
  accountingSchemeCurrency: string;
  totalLinesAccountingSchemeCurrency: string;
  grandTotalAccountingSchemeCurrency: string;
  vatReport: Array<PrintSalesInvoiceVat>;
  printRate: boolean;
  vatRegistered: boolean;
  buyerEmail: string;
  sellerContact: string;
}

export interface PrintSalesInvoiceParty extends CanHaveVatRegistration{
  name: string;
  road: string;
  city: string;
  country: string;
  zipCode: string;
  registration: string;
  idNumber: string;
}

export interface PrintSalesInvoiceItem {
  name: string;
  description: string;
  itemPrice: string;
  items: string;
  totalLine: string;
  vatRatePercent: string;
  totalLineToBePaid: string;
}

export interface PrintSalesInvoiceVat {
  vatRatePercent: string;
  vatTotal: string;
  vatTotalAccountingSchemeCurrency: string;
}
