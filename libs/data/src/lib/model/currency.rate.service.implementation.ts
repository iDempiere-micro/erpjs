import { Implement } from './base.service.implementation';
import { CurrencyModel, CurrencyRateService, OrganizationModel } from '@erpjs/model';
import { Injectable } from '@nestjs/common';
import { ModelModule } from '@erpjs/data';
import { CurrencyRate } from '../entities/currency.rate';

const moment = require('moment');

@Injectable()
export class CurrencyRateServiceImplementation extends Implement(CurrencyRateService) {
  constructor() {
    super();
    this.getAccountingForDateAndOrg =
      async (transactionDate: Date, from: CurrencyModel, org: OrganizationModel) => {
        const toCurrency = (await (await org.accountingScheme).currency);
        const fromP = Promise.resolve(from);
        if (from.id === toCurrency.id)
          return {
            id:0, displayName: '', currencyMultiplyingRate: 1, from: fromP, to: fromP,
            start: transactionDate, end: transactionDate};

          return await ModelModule.getEntityManager().getRepository(CurrencyRate)
              .createQueryBuilder('currencyRate')
              .where(
                'currencyRate.from = :from AND currencyRate.to = :to ' +
                ' AND currencyRate.start <= :transactionDate AND currencyRate.end >= :transactionDate',
                {
                  from: from.id,
                  to: toCurrency.id, transactionDate,
                })
              .getOne();
      }
  }
}
