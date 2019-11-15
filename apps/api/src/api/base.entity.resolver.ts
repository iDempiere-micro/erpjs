import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { Resolver } from '@nestjs/graphql';
import { BaseEntityService, BaseModel, BaseSaveArgsModel } from '@erpjs/model';
import { AppUser, run } from '@erpjs/data';
import { getManager } from 'typeorm';

@UseGuards(new GqlAuthGuard())
@Resolver()
export abstract class BaseEntityResolver<T extends BaseModel,
  S extends BaseSaveArgsModel, R extends BaseEntityService<T,S>> {
  abstract getService(): R;

  async find(user: AppUser) : Promise<Array<T>> {
    return run( user, getManager(), async () => await this.getService().loadEntities() );
  }
  async findById(id: number, user: AppUser) : Promise<T> {
    if (!id) return null;
    return run( user, getManager(), async () => await this.getService().loadEntity(id) );
  }

  async save(user: AppUser, objData: S): Promise<T> {
    return run( user, getManager(),async () => await this.getService().save(objData));
  }
}
