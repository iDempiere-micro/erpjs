import { VatRegistrationModel } from '../entities/vat.registration.model';

export interface HasVatRegistrations {
  vatRegistrations: Promise<Array<VatRegistrationModel>>
}
