import { BaseSaveArgsModel } from './base.save.args.model';
import { CurrencyModel } from '../entities/currency.model';
import { CustomerModel } from '../entities/customer.model';
import { AddressModel } from '../entities/address.model';
import { SalesStageModel } from '@erpjs/model';

export interface CustomerOrderSaveArgsModel extends BaseSaveArgsModel {
  currency: CurrencyModel
  customer: CustomerModel
  deliveryAddress: AddressModel
  displayName: string
  salesStage: SalesStageModel
}
