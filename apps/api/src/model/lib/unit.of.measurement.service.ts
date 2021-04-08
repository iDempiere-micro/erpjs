import { BaseEntityService } from './base.entity.service';
import { UnitOfMeasurementSaveArgsModel } from './unit.of.measurement.save.args.model';
import { UnitOfMeasurementModel } from './unit.of.measurement.model';
import { UnitOfMeasurement } from '../generated/entities/UnitOfMeasurement';
import { EntityManager, Repository } from 'typeorm';
import { UserModel } from './user.model';
import { Injectable } from '@nestjs/common';

export const UnitOfMeasurementServiceKey = 'UnitOfMeasurementService';

@Injectable()
export class UnitOfMeasurementService extends BaseEntityService<
  UnitOfMeasurementModel,
  UnitOfMeasurementSaveArgsModel
> {
  createEntity(): UnitOfMeasurementModel {
    return new UnitOfMeasurement();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: UnitOfMeasurementSaveArgsModel,
    entity: UnitOfMeasurementModel,
    currentUser: UserModel,
  ): Promise<UnitOfMeasurementModel> {
    entity.displayName = args.displayName;
    return transactionalEntityManager && currentUser && entity;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<UnitOfMeasurementModel> {
    return transactionalEntityManager.getRepository(UnitOfMeasurement);
  }

  typeName(): string {
    return UnitOfMeasurementServiceKey;
  }
}
