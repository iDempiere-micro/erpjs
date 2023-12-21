import { Query, Resolver } from '@nestjs/graphql';
import { Menu } from '../../model/generated/entities/Menu';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

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
