import { Injector } from '../injector';
import { BankAccountModel, BankModel, CountryModel } from '../..';

export abstract class BaseService {
  abstract getInjector(): Injector;

  async loadBank(id: number): Promise<BankModel> {
    return await this.getInjector().bankService.loadEntity(id);
  }
  async loadBankAccount(id: number): Promise<BankAccountModel> {
    return await this.getInjector().bankAccountService.loadEntity(id);
  }
  async loadCountry(id: number): Promise<CountryModel> {
    return await this.getInjector().countryService.loadEntity(id);
  }

}
