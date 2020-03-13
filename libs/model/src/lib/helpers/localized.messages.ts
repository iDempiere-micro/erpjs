export interface LocalizedMessages {
  title: string
  greeting: (string) => string
  unreadNotification: (number) => string
  invoice: (vatRegistered) => string
  issuedOn : string
  dueDate : string
  invoiceNumber: string
  transactionDate: string
  seller: string
  buyer: string
  idNumber: string
  vatNumber: string
  invoiceFooter: (PrintSalesInvoice) => string
  item: string
  units: string
  total: string
  reverseCharge: string
  totalToBePaid: string
}
