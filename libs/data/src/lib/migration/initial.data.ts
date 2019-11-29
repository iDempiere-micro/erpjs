import { anonym } from '../../../../../apps/api/src/environments/config';
import {
  BankSaveArgsModel,
  CountrySaveArgsModel,
  CurrencySaveArgsModel,
  OrganizationSaveArgsModel,
  VatRegistrationSaveArgsModel
} from '@erpjs/model';

const DataAnonymizer = require('data-anonymizer');
export const a =
  anonym ?
    new DataAnonymizer({ seed: Date.now().toString() })
  : { anonymize: x =>x };

export interface InitialData {
  initialUserEmail: string;
  homeCountry: CountrySaveArgsModel;
  currencies: CurrencySaveArgsModel[];
  banks: BankSaveArgsModel[];
  organizations: OrganizationSaveArgsModel[];
  vatRegistration: VatRegistrationSaveArgsModel[];
}
