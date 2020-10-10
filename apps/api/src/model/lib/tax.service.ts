import { TaxModel } from './tax.model';
import { TaxSaveArgsModel } from './tax.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';
import { Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { Tax } from './entity.base';

export const TaxServiceKey = 'TaxService';

@Injectable()
export class TaxService extends BaseEntityService<TaxModel, TaxSaveArgsModel> {
  createEntity(): TaxModel {
    return new Tax();
  }

  protected getRepository(transactionalEntityManager): Repository<TaxModel> {
    return transactionalEntityManager.getRepository(Tax);
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: TaxSaveArgsModel,
    tax: TaxModel
  ): Promise<TaxModel> {
    tax.ratePercent = args.ratePercent;
    tax.displayName = args.displayName;
    // TODO: if setting isStandard === true, remove old standard first
    tax.isStandard = args.isStandard;
    return tax;
  }

  typeName(): string {
    return TaxServiceKey;
  }

  getZeroTax = async (transactionalEntityManager: EntityManager) =>
    await this.getRepository(transactionalEntityManager).findOne({
      where: { ratePercent: 0 },
    });
  getStandardTax = async (transactionalEntityManager: EntityManager) =>
    await this.getRepository(transactionalEntityManager).findOne({
      where: { isStandard: true },
    });
}
