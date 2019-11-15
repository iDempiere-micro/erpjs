import { BaseSaveArgsModel } from './base.save.args.model';
import { BankAccountModel } from '../entities/bank.account.model';
import { CustomerModel } from '../entities/customer.model';
import { OrganizationModel } from '../entities/organization.model';
import { CurrencyModel } from '../entities/currency.model';
import { ProductQuantityPriceTaxModel } from '../helpers/product.quantity.price.tax.model';

export interface SalesInvoiceSaveArgsModel extends BaseSaveArgsModel {
  bankAccount: BankAccountModel,
  customer: CustomerModel,
  organization: OrganizationModel,
  paymentTermInDays: number,
  transactionDate: Date,
  currency: CurrencyModel,
  lines: Array<ProductQuantityPriceTaxModel>
}
