const DataAnonymizer = require('data-anonymizer');
export const a = new DataAnonymizer({ seed: 'my secret seed 123' });

import {
  BankSaveArgsModel,
  CountrySaveArgsModel,
  CurrencySaveArgsModel,
  OrganizationSaveArgsModel,
  VatRegistrationSaveArgsModel
} from '@erpjs/model';

export interface InitialData {
  initialUserEmail: string;
  homeCountry: CountrySaveArgsModel;
  currencies: CurrencySaveArgsModel[];
  banks: BankSaveArgsModel[];
  organizations: OrganizationSaveArgsModel[];
  vatRegistration: VatRegistrationSaveArgsModel[];
}
