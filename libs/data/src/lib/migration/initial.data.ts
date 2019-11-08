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
