import { AddressModel } from '../entities/address.model';

export interface HasLegalAddress {
  legalAddress: Promise<AddressModel>;
}
