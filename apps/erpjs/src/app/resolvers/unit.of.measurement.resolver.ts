import { Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import { UnitOfMeasurement } from '../../model/generated/entities/UnitOfMeasurement';
import {
  UnitOfMeasurementService,
  UnitOfMeasurementServiceKey,
} from '../../model';
import { EntityManager, getManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
// import { UnitOfMeasurementSaveArgs } from '../saveArgs/unitOfMeasurement.save.args';

@Resolver(() => UnitOfMeasurement)
@UseGuards(GqlAuthGuard)
export class UnitOfMeasurementResolver {
  constructor(
    @Inject(UnitOfMeasurementServiceKey)
    protected readonly unitOfMeasurementService: UnitOfMeasurementService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [UnitOfMeasurement])
  async currencies() {
    return await this.unitOfMeasurementService.loadEntities(this.entityManager);
  }

  /*@Mutation(() => UnitOfMeasurement)
  async saveUnitOfMeasurement(
    @Args('args') objData: UnitOfMeasurementSaveArgs,
    @CurrentUser() user,
  ): Promise<UnitOfMeasurementModel> {
    return await this.unitOfMeasurementService.save(
      this.entityManager,
      objData,
      user,
    );
  }*/
}
