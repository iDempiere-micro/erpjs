import { Inject, Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { UnitOfMeasurementConversionModel } from './unit.of.measurement.conversion.model';
import { UnitOfMeasurementConversionSaveArgsModel } from './unit.of.measurement.conversion.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { UserModel } from './user.model';
import { UnitOfMeasurementConversion } from '../generated/entities/UnitOfMeasurementConversion';
import {
  UnitOfMeasurementService,
  UnitOfMeasurementServiceKey,
} from './unit.of.measurement.service';

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

  constructor(
    @Inject(UnitOfMeasurementServiceKey)
    public readonly unitOfMeasurementService: UnitOfMeasurementService,
  ) {
    super();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: UnitOfMeasurementConversionSaveArgsModel,
    entity: UnitOfMeasurementConversionModel,
    currentUser: UserModel,
  ): Promise<UnitOfMeasurementConversionModel> {
    entity.from = await this.unitOfMeasurementService.loadEntityById(
      transactionalEntityManager,
      args.fromUoMId,
    );
    entity.to = await this.unitOfMeasurementService.loadEntityById(
      transactionalEntityManager,
      args.toUoMId,
    );
    entity.unitMultiplyingRate = args.unitMultiplyingRate;
    return currentUser && entity;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<UnitOfMeasurementConversionModel> {
    return transactionalEntityManager.getRepository(
      UnitOfMeasurementConversion,
    );
  }

  typeName(): string {
    return UnitOfMeasurementConversionServiceKey;
  }
}
