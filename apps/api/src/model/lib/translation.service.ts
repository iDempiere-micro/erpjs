import { LanguageModel } from './language.model';
import { LocalizedMessages } from './localized.messages';
import { Injectable } from '@nestjs/common';
import { PrintSalesInvoice } from './print.sales.invoice';

export const TranslationServiceKey = 'TranslationService';

const messagesCZ: LocalizedMessages = {
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
  unreadNotification: (unread: number) =>
    (unread === 0
      ? 'Nemáte žádné nepřečtené zprávy'
      : `Máte ${unread} nepřečtených zpráv`) + '.',
  invoice: (vatRegistered: boolean) =>
    `Faktura ${vatRegistered ? '- daňový doklad' : ''}`,
  invoiceFooter: (invoice: PrintSalesInvoice) =>
    `Děkujeme, že jste si vybrali naši společnost. Uhraďte prosím částku ${invoice.grandTotal} ${invoice.currency} ` +
    `pod variabilním symbolem ${invoice.invoiceNumber} tak, aby byla ` +
    `připsána na náš účet ${
      invoice.printRate ? invoice.iban : ''
    } nejpozději dne ${invoice.dueDatePrintable}. ` +
    `${
      invoice.printRate
        ? 'Úhradu můžete provést také v ' +
          invoice.accountingSchemeCurrency +
          ' ve výši ' +
          invoice.grandTotalAccountingSchemeCurrency +
          ' ' +
          invoice.accountingSchemeCurrency +
          ' na náš účet ' +
          invoice.payTo +
          ', tím přistupujete na dohodu o změně platebních podmínek (platba v ' +
          'Kč, přepočet kursem na faktuře).'
        : ''
    } Věříme, že jste s našimi službami spokojeni a těšíme se na úspěšnou a dlouhodobou spolupráci.`,
};
const messagesEN: LocalizedMessages = {
  totalToBePaid: '',
  reverseCharge: '',
  buyer: '',
  dueDate: '',
  idNumber: '',
  invoiceFooter: function (p1) {
    return '';
  },
  invoiceNumber: '',
  issuedOn: '',
  item: '',
  seller: '',
  total: '',
  transactionDate: '',
  units: '',
  vatNumber: '',
  title: 'Simple i18n implementation with TypeScript',
  greeting: (name = 'John Doe') => `Hello, ${name}.`,
  unreadNotification: (unread: number) =>
    `You have ${unread === 0 ? 'no' : unread} unread message${
      unread === 1 ? '' : 's'
    }.`,
  invoice: (vatRegistered: boolean) => `Invoice`,
};
const messagesCZDE: LocalizedMessages = {
  totalToBePaid: 'Celkem k úhradě / Insgesamt zu einzahlen',
  reverseCharge:
    'Daň odvede zákazník / Steuerschuldnerschaft des Leistungsempfängers',
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
  title:
    'Jednoduchá implementace i18n v TypeScriptu - Einfache i18n-Implementierung in TypeScript',
  greeting: (name = 'John Doe') => `Ahoj ${name} - Hi ${name}.`,
  unreadNotification: (unread: number) =>
    (unread === 0
      ? 'Nemáte žádné nepřečtené zprávy'
      : `Máte ${unread} nepřečtených zpráv`) +
    '. -' +
    `Sie haben ${unread} ungelesene Nachrichten`,
  invoice: (vatRegistered: boolean) =>
    `Faktura ${vatRegistered ? '- daňový doklad' : ''} / Rechnung ${
      vatRegistered ? '- Steuerbeleg' : ''
    }`,
  invoiceFooter: (invoice: PrintSalesInvoice) =>
    `Danke, dass Sie sich für unser Unternehmen entschieden haben. Bitte zahlen Sie den Betrag von ${invoice.grandTotal} ${invoice.currency} ` +
    `unter dem variablen Symbol ${invoice.invoiceNumber} eingutgeschrieben auf unser Konto ` +
    `${invoice.printRate ? invoice.iban : ''} spätestens ${
      invoice.dueDatePrintable
    }. ` +
    `Wir glauben, dass Sie mit unseren Dienstleistungen zufrieden sind und freuen uns auf eine erfolgreiche und langfristige Zusammenarbeit`,
};

const messages = {
  en: messagesEN,
  cz: messagesCZ,
  'cz-de': messagesCZDE,
};

@Injectable()
export class TranslationService {
  getMessages = (language: LanguageModel): LocalizedMessages =>
    messages[language.isoCode];
}
