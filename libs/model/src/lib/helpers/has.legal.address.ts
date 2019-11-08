import { AddressModel } from '../..';

export interface HasLegalAddress {
  legalAddress: Promise<AddressModel>;
}
