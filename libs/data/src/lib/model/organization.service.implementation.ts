import { Injector, OrganizationModel, OrganizationSaveArgsModel, OrganizationService } from '@erpjs/model';
import { Organization } from '../entities/organization';
import { ModelModule } from '@erpjs/data';
import { AccountingScheme } from '../entities/accounting.scheme';

export class OrganizationServiceImplementation extends OrganizationService {
  async createEntity(): Promise<Organization> {
    return new Organization();
  }

  getInjector(): Injector {
    return ModelModule.getInjector();
  }

  async loadAccountingScheme(id: number): Promise<AccountingScheme> {
    return ModelModule.getEntityManager().getRepository(AccountingScheme).findOne(id);
  }

  async loadEntity(id: number): Promise<Organization> {
    return ModelModule.getEntityManager().getRepository(Organization).findOne(id);
  }

  async save(args: OrganizationSaveArgsModel): Promise<OrganizationModel> {
    return await ModelModule.getEntityManager().save(await super.save(args));
  }
}
