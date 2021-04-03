import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { UnitOfMeasurement } from '../../model/generated/entities/UnitOfMeasurement';
import {
  UnitOfMeasurementModel,
  UnitOfMeasurementService,
  UnitOfMeasurementServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
// import { UnitOfMeasurementSaveArgs } from '../saveArgs/unitOfMeasurement.save.args';

@Resolver(() => UnitOfMeasurement)
@UseGuards(GqlAuthGuard)
export class UnitOfMeasurementResolver {
  constructor(
    @Inject(UnitOfMeasurementServiceKey)
    protected readonly unitOfMeasurementService: UnitOfMeasurementService,
  ) {}

  @Query(() => [UnitOfMeasurement])
  async currencies() {
    return await this.unitOfMeasurementService.loadEntities(getManager());
  }

  /*@Mutation(() => UnitOfMeasurement)
  async saveUnitOfMeasurement(
    @Args('args') objData: UnitOfMeasurementSaveArgs,
    @CurrentUser() user,
  ): Promise<UnitOfMeasurementModel> {
    return await this.unitOfMeasurementService.save(
      getManager(),
      objData,
      user,
    );
  }*/
}
