import { VatRegistrationModel } from '../..';

export interface HasVatRegistrations {
  vatRegistrations: Promise<Array<VatRegistrationModel>>
}
