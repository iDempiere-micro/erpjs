import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { UnitOfMeasurementConversion } from '../generated/entities/UnitOfMeasurementConversion';
import { BaseEntityService } from './base.entity.service';
import { UnitOfMeasurementConversionModel } from './unit.of.measurement.conversion.model';
import { UnitOfMeasurementConversionSaveArgsModel } from './unit.of.measurement.conversion.save.args.model';
import {
  UnitOfMeasurementService,
  UnitOfMeasurementServiceKey,
} from './unit.of.measurement.service';
import { UserModel } from './user.model';

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
    ) as Repository<UnitOfMeasurementConversionModel>;
  }

  typeName(): string {
    return UnitOfMeasurementConversionServiceKey;
  }
}
