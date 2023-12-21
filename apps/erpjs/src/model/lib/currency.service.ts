import { EntityManager, Repository } from 'typeorm';
import { CurrencyModel } from './currency.model';
import { CurrencySaveArgsModel } from './currency.save.args.model';
import { BaseEntityService } from './base.entity.service';
import { Currency } from '../generated/entities/Currency';

export const CurrencyServiceKey = 'CurrencyService';

export class CurrencyService extends BaseEntityService<
  CurrencyModel,
  CurrencySaveArgsModel
> {
  createEntity(): CurrencyModel {
    return new Currency();
  }

  protected getRepository(
    transactionalEntityManager,
  ): Repository<CurrencyModel> {
    return transactionalEntityManager.getRepository(Currency);
  }

  getCurrency(
    transactionalEntityManager: EntityManager,
    isoCode: string,
    id?: number,
  ) {
    return id
      ? this.loadEntityById(transactionalEntityManager, id)
      : this.getRepository(transactionalEntityManager).findOne({
          where: { isoCode },
        });
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CurrencySaveArgsModel,
    currency: CurrencyModel,
  ): Promise<CurrencyModel> {
    currency.displayName = args.displayName;
    currency.isoCode = args.isoCode;
    return currency;
  }

  typeName(): string {
    return CurrencyServiceKey;
  }
}
