import { Injector } from '../injector';
import { BankModel } from '../entities/bank.model';
import { BankAccountModel } from '../entities/bank.account.model';
import { CountryModel } from '../entities/country.model';
import { CurrencyModel } from '../entities/currency.model';
import { BaseModel } from '../entities/base.model';
import { BaseEntityService } from './base.entity.service';
import { BaseSaveArgsModel } from '../args/base.save.args.model';
import { OrganizationModel } from '../entities/organization.model';

export abstract class BaseService {
  abstract getInjector(): Injector;
  abstract typeName(): string;

  async loadBank(id: number): Promise<BankModel> {
    return await this.getInjector().bankService.loadEntity(id);
  }
  async loadBankAccount(id: number): Promise<BankAccountModel> {
    return await this.getInjector().bankAccountService.loadEntity(id);
  }
  async loadCountryByIsoCode(isoCode: string): Promise<CountryModel> {
    return await this.getInjector().countryService.getCountry(isoCode);
  }

  async loadCurrencyByIsoCode(isoCode: string): Promise<CurrencyModel> {
    return await this.getInjector().currencyService.getCurrency(isoCode);
  }
  async loadOrgByDisplayName(displayName: string): Promise<OrganizationModel> {
    return await this.getInjector().organizationService.getOrg(displayName);
  }
}

export type Constructor<I> = new (...args: any[]) => I;

// using the approach found at https://stackoverflow.com/a/55601197/2013924
export function Model<E extends BaseModel, I extends BaseEntityService<E, S>, T extends Constructor<I>, S extends BaseSaveArgsModel>(
  constructor: T = BaseService as any,
  serviceKey: string,
  save: (args:S, old:E, service, base:BaseService) => Promise<E>
) {
  // @ts-ignore
  return class extends constructor implements I {
    loadEntities: () => Promise<E[]>;
    getInjector: () => Injector;
    createEntity: () => Promise<E>;
    loadEntity: (id) => Promise<E>;

    typeName(): string { return serviceKey; }

    async save(args: S): Promise<E> {
      const entity =
        args.id ? await this.loadEntity(args.id) : await this.createEntity();
      return await save(args, entity, this as any, this as any);
    }
  };
}
