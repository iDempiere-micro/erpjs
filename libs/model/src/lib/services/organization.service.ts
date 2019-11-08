import { BaseEntityService } from './base.entity.service';
import { AccountingSchemeModel, BaseService, OrganizationModel, OrganizationSaveArgsModel } from '../..';

export abstract class OrganizationService extends BaseService implements BaseEntityService<OrganizationModel, OrganizationSaveArgsModel> {
  async abstract createEntity(): Promise<OrganizationModel>;

  async abstract loadEntity(id: number): Promise<OrganizationModel>;

  async abstract loadAccountingScheme(id: number): Promise<AccountingSchemeModel>;

  async  save(args: OrganizationSaveArgsModel): Promise<OrganizationModel> {
    const organization =
      args.id ? await this.loadEntity(args.id) : await this.createEntity();
    organization.contact = args.contact;
    organization.accountingScheme = Promise.resolve(await this.loadAccountingScheme(args.accountingSchemeId));
    organization.registration = args.registration;
    organization.displayName = args.displayName;
    organization.legalName = args.legalName;
    organization.legalAddress = Promise.resolve(await this.getInjector().addressService.save(args.legalAddress))
    organization.bankAccount = Promise.resolve(await this.loadBankAccount(args.bankAccountId));

    return organization;
  }

}
