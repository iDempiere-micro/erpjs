import { BankService } from './services/bank.service';
import { CountryService } from './services/country.service';
import { AddressService } from './services/address.service';
import { BankAccountService } from './services/bank.account.service';
import { OrganizationService } from './services/organization.service';

export interface Injector {
  bankService: BankService;
  countryService: CountryService;
  addressService: AddressService;
  bankAccountService: BankAccountService;
  organizationService: OrganizationService;
}
