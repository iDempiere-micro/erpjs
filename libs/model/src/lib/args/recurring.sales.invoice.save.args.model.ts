import { BaseSaveArgsModel } from './base.save.args.model';
import { BankAccountModel } from '../entities/bank.account.model';
import { CustomerModel } from '../entities/customer.model';
import { OrganizationModel } from '../entities/organization.model';
import { CurrencyModel } from '../entities/currency.model';
import { ProductQuantityPriceTaxModel } from '../helpers/product.quantity.price.tax.model';

export interface RecurringSalesInvoiceSaveArgsModel extends BaseSaveArgsModel {
  bankAccount?: BankAccountModel,
  bankAccountDisplayName? : string;
  customer?: CustomerModel,
  customerDisplayName?: string;
  organization?: OrganizationModel,
  organizationDisplayName?: string;
  currency?: CurrencyModel,
  currencyIsoCode?: string;
  lines: Array<ProductQuantityPriceTaxModel>
  paymentTermInDays: number,
  lastDayInMonth: boolean;
  cronPattern?: string;
}
