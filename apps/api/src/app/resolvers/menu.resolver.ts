import { Query, Resolver } from '@nestjs/graphql';
import { Menu } from '../../model/generated/entities/Menu';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import { getManager } from 'typeorm';

@Resolver(() => Menu)
@UseGuards(GqlAuthGuard)
export class MenuResolver {
  constructor() {
  }

  @Query(() => [Menu])
  async menu() {
    const manager = getManager();

    return await manager.find(Menu);
  }
}
