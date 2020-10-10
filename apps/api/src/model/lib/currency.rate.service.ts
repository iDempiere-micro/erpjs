import { CurrencyRateModel } from './currency.rate.model';
import { CurrencyRateSaveArgsModel } from './currency.rate.save.args.model';
import { CurrencyModel } from './currency.model';
import { EntityManager, Repository } from 'typeorm/index';
import { Inject, Injectable } from '@nestjs/common';
import { CurrencyService, CurrencyServiceKey } from './currency.service';
import { BaseEntityService } from './base.entity.service';
import { OrganizationModel } from './organization.model';
import { CurrencyRate } from './entity.base';
import {
  OrganizationService,
  OrganizationServiceKey,
} from './organization.service';

export const CurrencyRateServiceKey = 'CurrencyRateService';

@Injectable()
export class CurrencyRateService extends BaseEntityService<
  CurrencyRateModel,
  CurrencyRateSaveArgsModel
> {
  constructor(
    @Inject(CurrencyServiceKey)
    protected readonly currencyService: CurrencyService,
    @Inject(OrganizationServiceKey)
    protected readonly organizationService: OrganizationService
  ) {
    super();
  }

  getAccountingForDateAndOrg = async (
    transactionalEntityManager: EntityManager,
    transactionDate: Date,
    from: CurrencyModel,
    org: OrganizationModel
  ) => {
    const toCurrency: CurrencyModel =
      org?.accountingScheme?.currency ||
      (
        await this.organizationService.reloadEntity(
          transactionalEntityManager,
          org,
          ['accountingScheme', 'accountingScheme.currency']
        )
      ).accountingScheme.currency;

    if (from.id === toCurrency.id)
      return {
        id: 0,
        displayName: '',
        currencyMultiplyingRate: 1,
        from,
        to: from,
        start: transactionDate,
        end: transactionDate,
      };

    return await this.getRepository(transactionalEntityManager)
      .createQueryBuilder('currencyRate')
      .where(
        'currencyRate.from = :from AND currencyRate.to = :to ' +
          ' AND currencyRate.start <= :transactionDate AND currencyRate.end >= :transactionDate',
        {
          from: from.id,
          to: toCurrency.id,
          transactionDate,
        }
      )
      .getOne();
  };

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CurrencyRateSaveArgsModel,
    entity: CurrencyRateModel
  ): Promise<CurrencyRateModel> {
    const currencyService = this.currencyService;
    entity.currencyMultiplyingRate = args.currencyMultiplyingRate;
    entity.end = args.end;
    entity.start = args.start;
    entity.from =
      args.from ||
      (await currencyService.getCurrency(
        transactionalEntityManager,
        args.fromIsoCode
      ));
    entity.to =
      args.to ||
      (await currencyService.getCurrency(
        transactionalEntityManager,
        args.toIsoCode
      ));
    return entity;
  }

  typeName(): string {
    return CurrencyRateServiceKey;
  }

  createEntity(): CurrencyRateModel {
    return new CurrencyRate();
  }

  protected getRepository(
    transactionalEntityManager
  ): Repository<CurrencyRateModel> {
    return transactionalEntityManager.getRepository(CurrencyRate);
  }
}
