import { BaseModel } from './base.model';
import { AddressModel } from './address.model';

export interface WarehouseModel extends BaseModel {
  address: Promise<AddressModel>;
}
