import { BaseEntityService } from './base.entity.service';
import { CountryModel } from './country.model';
import { CountrySaveArgsModel } from './country.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Country } from '../generated/entities/Country';

export const CountryServiceKey = 'CountryService';

@Injectable()
export class CountryService extends BaseEntityService<
  CountryModel,
  CountrySaveArgsModel
> {
  createEntity(): CountryModel {
    return new Country();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CountrySaveArgsModel,
    country: CountryModel,
  ): Promise<CountryModel> {
    country.displayName = args.displayName;
    country.isoCode = args.isoCode;
    return country;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<CountryModel> {
    return transactionalEntityManager.getRepository(Country) as Repository<CountryModel>;
  }

  getCountry = async (
    transactionalEntityManager: EntityManager,
    isoCode: string,
    id?: number,
  ) =>
    id
      ? this.loadEntityById(transactionalEntityManager, id)
      : this.getRepository(transactionalEntityManager).findOne({
          where: { isoCode },
        });

  typeName(): string {
    return CountryServiceKey;
  }
}
