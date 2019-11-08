import {
  AddressService,
  BankAccountService,
  BankService,
  CountryService,
  Injector,
  OrganizationService
} from '@erpjs/model';
import { Inject, Injectable } from '@nestjs/common';
import { ModelModule } from '@erpjs/data';

@Injectable()
export class InjectorImplementation implements Injector {
  constructor(
    @Inject('AddressService') public readonly addressService: AddressService,
    @Inject('BankAccountService') public readonly bankAccountService: BankAccountService,
    @Inject('BankService') public readonly bankService: BankService,
    @Inject('CountryService') public readonly countryService: CountryService,
    @Inject('OrganizationService') public readonly organizationService: OrganizationService,
  ) {
    ModelModule.setInjector(this);
  }
}
