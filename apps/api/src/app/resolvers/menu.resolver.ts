import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { GqlAuthGuard } from '../../auth';
import { Menu } from '../../model/generated/entities/Menu';

@Resolver(() => Menu)
@UseGuards(GqlAuthGuard)
export class MenuResolver {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  @Query(() => [Menu])
  async menu() {
    return await this.entityManager.find(Menu);
  }
}
