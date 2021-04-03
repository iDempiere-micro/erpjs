import { PrintSalesInvoice } from './print.sales.invoice';

export interface LocalizedMessages {
  title: string;
  greeting: (g: string) => string;
  unreadNotification: (n: number) => string;
  invoice: (reg: boolean) => string;
  issuedOn: string;
  dueDate: string;
  invoiceNumber: string;
  transactionDate: string;
  seller: string;
  buyer: string;
  idNumber: string;
  vatNumber: string;
  invoiceFooter: (print: PrintSalesInvoice) => string;
  item: string;
  units: string;
  total: string;
  reverseCharge: string;
  totalToBePaid: string;
}
