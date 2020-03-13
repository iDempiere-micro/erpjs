import { BaseSaveArgsModel } from './base.save.args.model';
import { AddressSaveArgsModel } from './address.save.args.model';

export interface WarehouseSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  address: AddressSaveArgsModel;
}
