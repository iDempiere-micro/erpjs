import { BaseEntityService } from './base.entity.service';
import { UserToOrganizationModel } from './user.to.organization.model';
import { UserToOrganizationSaveArgsModel } from './user.to.organization.save.args.model';
import { UserToOrganization } from './entity.base';
import { EntityManager, Repository } from 'typeorm/index';

export const UserToOrganizationServiceKey = 'UserToOrganizationService';

export class UserToOrganizationService extends BaseEntityService<
  UserToOrganizationModel,
  UserToOrganizationSaveArgsModel
> {
  createEntity(): UserToOrganizationModel {
    return new UserToOrganization();
  }

  protected getRepository(transactionalEntityManager:EntityManager): Repository<UserToOrganizationModel>{
    return transactionalEntityManager.getRepository(UserToOrganization);
  }
  protected async doSave(
    transactionalEntityManager:EntityManager,
    args: UserToOrganizationSaveArgsModel,
    entity: UserToOrganizationModel
  ): Promise<UserToOrganizationModel> {
    entity.organization = args.organization;
    entity.user = args.user;
    return entity;
  }

  typeName(): string {
    return UserToOrganizationServiceKey;
  }
}
