import { Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { UnitOfMeasurementConversionModel } from './unit.of.measurement.conversion.model';
import { UnitOfMeasurementConversionSaveArgsModel } from './unit.of.measurement.conversion.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { UserModel } from './user.model';
import { UnitOfMeasurementConversion } from '../generated/entities/UnitOfMeasurementConversion';

export const UnitOfMeasurementConversionServiceKey =
  'UnitOfMeasurementConversionService';

@Injectable()
export class UnitOfMeasurementConversionService extends BaseEntityService<
  UnitOfMeasurementConversionModel,
  UnitOfMeasurementConversionSaveArgsModel
> {
  createEntity(): UnitOfMeasurementConversionModel {
    return new UnitOfMeasurementConversion();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: UnitOfMeasurementConversionSaveArgsModel,
    entity: UnitOfMeasurementConversionModel,
    currentUser: UserModel,
  ): Promise<UnitOfMeasurementConversionModel> {
    return Promise.resolve(undefined);
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<UnitOfMeasurementConversionModel> {
    return undefined;
  }

  typeName(): string {
    return '';
  }
}
