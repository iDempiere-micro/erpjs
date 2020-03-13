import { LocalizedMessages, PrintSalesInvoice } from '@erpjs/model';

export const messages : LocalizedMessages = {
  totalToBePaid: 'Celkem k platbě',
  reverseCharge: 'Daň odvede zákazník',
  buyer: 'Odběratel',
  dueDate: 'Splatná',
  idNumber: 'IČ',
  invoiceNumber: 'Variabilní symbol platby',
  issuedOn: 'Vytvořena',
  item: 'Položka',
  seller: 'Dodavatel',
  total: 'Celkem',
  transactionDate: 'DUZP',
  units: 'Jednotek',
  vatNumber: 'DIČ',
  title: 'Jednoduchá implementace i18n v TypeScriptu',
  greeting: (name = 'John Doe') => `Ahoj ${name}.`,
  unreadNotification: (unread: number) => (unread === 0 ? 'Nemáte žádné nepřečtené zprávy': `Máte ${unread} nepřečtených zpráv`) + '.',
  invoice: (vatRegistered:string) => `Faktura ${vatRegistered ? '- daňový doklad': ''}`,
  invoiceFooter: (invoice:PrintSalesInvoice) =>
    `Děkujeme, že jste si vybrali naši společnost. Uhraďte prosím částku ${invoice.grandTotal} ${invoice.currency} `+
    `pod variabilním symbolem ${invoice.invoiceNumber} tak, aby byla ` +
    `připsána na náš účet ${invoice.printRate? invoice.iban: ''} nejpozději dne ${invoice.dueDatePrintable}. `+
    `${invoice.printRate? 'Úhradu můžete provést také v ' + invoice.accountingSchemeCurrency +
      ' ve výši ' + invoice.grandTotalAccountingSchemeCurrency + ' '  + invoice.accountingSchemeCurrency +
      ' na náš účet ' + invoice.payTo + ', tím přistupujete na dohodu o změně platebních podmínek (platba v ' +
      'Kč, přepočet kursem na faktuře).': ''} Věříme, že jste s našimi službami spokojeni a těšíme se na úspěšnou a dlouhodobou spolupráci.`
};
