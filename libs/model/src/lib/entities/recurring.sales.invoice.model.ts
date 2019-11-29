import { BaseModel } from './base.model';
import { HasProductsQuantitiesPricesTaxes } from '../helpers/has.products.quantities.prices.taxes';
import { HasCustomer } from '../helpers/has.customer';
import { HasCurrency } from '../helpers/has.currency';
import { HasOrganization } from '../helpers/has.organization';
import { HasBankAccount } from '../helpers/has.bank.account';

export interface RecurringSalesInvoiceModel extends BaseModel, HasProductsQuantitiesPricesTaxes,
  HasCustomer, HasCurrency,
  HasOrganization, HasBankAccount {

  paymentTermInDays: number,
  lastDayInMonth: boolean;
  cronPattern?: string;
}
