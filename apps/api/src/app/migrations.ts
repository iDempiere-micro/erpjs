import { CreateAnAddress1595508635328 } from './migrations/1595508635328-CreateAnAddress';
import { CreateInvoice2020071596526951614 } from './migrations/1596526951614-CreateInvoice202007';
import { CreateInvoice202007B1596628283384 } from './migrations/1596628283384-CreateInvoice202007B';
import { CreateInvoice202007C1597723044723 } from './migrations/1597723044723-CreateInvoice202007C';
import { Invoices2020081598520059145 } from './migrations/1598520059145-Invoices202008';
import { Invoices202008B1599053746373 } from './migrations/1599053746373-Invoices202008B';
import { Invoices202008C1599277217737 } from './migrations/1599277217737-Invoices202008C';
import { Invoices2020091601905859728 } from './migrations/1601905859728-Invoices202009';
import { Invoices2020101604477022458 } from './migrations/1604477022458-Invoices202010';
import { Invoices2020111607012419575 } from './migrations/1607012419575-Invoices202011';
import { CreateUser1595508635324 } from './migrations/1595508635324-CreateUser';

export const migrations = [
  CreateUser1595508635324,
  CreateAnAddress1595508635328,
  CreateInvoice2020071596526951614,
  CreateInvoice202007B1596628283384,
  CreateInvoice202007C1597723044723,
  Invoices2020081598520059145,
  Invoices202008B1599053746373,
  Invoices202008C1599277217737,
  Invoices2020091601905859728,
  Invoices2020101604477022458,
  Invoices2020111607012419575,
];
