import { BaseEntityResolver } from './base.entity.resolver';
import { UserModel, UserService, UserServiceKey } from '@erpjs/model';
import { UserSaveArgs } from './args/user.save.args';
import { AppUser } from '@erpjs/data';
import { Inject } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';

export class UserResolver
  extends BaseEntityResolver<UserModel, UserSaveArgs, UserService> {
  getService(): UserService {
    return this.userService;
  }
  constructor(
    @Inject(UserServiceKey) private readonly userService : UserService,
  ) { super(); }

  @Query(returns => [AppUser])
  async users(
    @CurrentUser() user,
  ) {
    return this.find(user);
  }

}
