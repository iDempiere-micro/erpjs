import { LocalizedMessages } from '@erpjs/model';

export const messages : LocalizedMessages = {
  totalToBePaid: '',
  reverseCharge: '',
  buyer: '', dueDate: '', idNumber: '', invoiceFooter: function(p1) {
    return '';
  }, invoiceNumber: '', issuedOn: '', item: '', seller: '', total: '', transactionDate: '', units: '', vatNumber: '',
  title: 'Simple i18n implementation with TypeScript',
  greeting: (name = 'John Doe') => `Hello, ${name}.`,
  unreadNotification: (unread: number) => `You have ${unread === 0 ? 'no' : unread} unread message${unread === 1 ? '' : 's'}.`,
  invoice: (vatRegistered:string) => `Invoice`
};
