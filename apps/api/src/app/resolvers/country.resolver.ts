import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Country } from '../../model/generated/entities/Country';
import { CountryModel, CountryService, CountryServiceKey } from '../../model';
import { getManager } from 'typeorm';
import { CountrySaveArgs } from '../saveArgs/country.save.args';

@Resolver(() => Country)
@UseGuards(GqlAuthGuard)
export class CountryResolver {
  constructor(
    @Inject(CountryServiceKey)
    protected readonly countryService: CountryService,
  ) {}

  @Query(() => [Country])
  async countries() {
    return await this.countryService.loadEntities(getManager());
  }

  @Query(() => Country)
  async country(@Args('id', { type: () => Int }) id: number) {
    const result = await this.countryService.loadEntityById(getManager(), id);
    return result;
  }

  @Mutation(() => Country)
  async saveCountry(
    @Args('args') objData: CountrySaveArgs,
    @CurrentUser() user,
  ): Promise<CountryModel> {
    return await this.countryService.save(getManager(), objData, user);
  }
}
