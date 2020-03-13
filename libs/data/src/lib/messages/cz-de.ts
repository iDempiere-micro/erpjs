import { LocalizedMessages, PrintSalesInvoice } from '@erpjs/model';

export const messages : LocalizedMessages = {
  totalToBePaid: 'Celkem k úhradě / Insgesamt zu einzahlen',
  reverseCharge: 'Daň odvede zákazník / Steuerschuldnerschaft des Leistungsempfängers',
  item: 'Položka / Nummer',
  total: 'Celkem / Summe',
  units: 'Množství / Menge',
  idNumber: 'IČ / Id Number',
  vatNumber: 'DIČ / VAT Id',
  buyer: 'Odběratel / Abnehmer',
  seller: 'Dodavatel / Lieferant',
  transactionDate: 'DUZP',
  invoiceNumber: 'Variabilní symbol platby',
  dueDate: 'Datum splatnosti / Fälligkeitsdatum',
  issuedOn: 'Vystaveno / Datum',
  title: 'Jednoduchá implementace i18n v TypeScriptu - Einfache i18n-Implementierung in TypeScript',
  greeting: (name = 'John Doe') => `Ahoj ${name} - Hi ${name}.`,
  unreadNotification: (unread: number) => (unread === 0 ? 'Nemáte žádné nepřečtené zprávy': `Máte ${unread} nepřečtených zpráv`) + '. -' +
    `Sie haben ${unread} ungelesene Nachrichten`,
  invoice: (vatRegistered:string) => `Faktura ${vatRegistered ? '- daňový doklad': ''} / Rechnung ${vatRegistered ? '- Steuerbeleg': ''}`,
  invoiceFooter: (invoice:PrintSalesInvoice) =>
    `Danke, dass Sie sich für unser Unternehmen entschieden haben. Bitte zahlen Sie den Betrag von ${invoice.grandTotal} ${invoice.currency} `+
    `unter dem variablen Symbol ${invoice.invoiceNumber} eingutgeschrieben auf unser Konto ` +
    `${invoice.printRate? invoice.iban: ''} spätestens ${invoice.dueDatePrintable}. `+
    `Wir glauben, dass Sie mit unseren Dienstleistungen zufrieden sind und freuen uns auf eine erfolgreiche und langfristige Zusammenarbeit`
};

