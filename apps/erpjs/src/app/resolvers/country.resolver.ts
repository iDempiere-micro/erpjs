import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Country } from '../../model/generated/entities/Country';
import { CountryModel, CountryService, CountryServiceKey } from '../../model';
import { EntityManager, getManager } from 'typeorm';
import { CountrySaveArgs } from '../saveArgs/country.save.args';
import { InjectEntityManager } from '@nestjs/typeorm';

@Resolver(() => Country)
@UseGuards(GqlAuthGuard)
export class CountryResolver {
  constructor(
    @Inject(CountryServiceKey)
    protected readonly countryService: CountryService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [Country])
  async countries() {
    return await this.countryService.loadEntities(this.entityManager);
  }

  @Query(() => Country)
  async country(@Args('id', { type: () => Int }) id: number) {
    const result = await this.countryService.loadEntityById(
      this.entityManager,
      id,
    );
    return result;
  }

  @Mutation(() => Country)
  async saveCountry(
    @Args('args') objData: CountrySaveArgs,
    @CurrentUser() user,
  ): Promise<CountryModel> {
    return await this.countryService.save(this.entityManager, objData, user);
  }
}
