import { BaseEntityServiceImplementation } from './base.entity.service';
import { OrganizationModel } from '../entities/organization.model';
import { OrganizationSaveArgsModel } from '../args/organization.save.args.model';

export const OrganizationServiceKey = 'OrganizationService';

export class OrganizationService extends BaseEntityServiceImplementation<OrganizationModel, OrganizationSaveArgsModel> {
  getOrg: (displayName: string) => Promise<OrganizationModel>;

  protected async doSave(args: OrganizationSaveArgsModel, organization: OrganizationModel): Promise<OrganizationModel> {
    organization.contact = args.contact;
    organization.accountingScheme =
      Promise.resolve( args.accountingScheme ? args.accountingScheme :
        await this.getInjector().accountingSchemeService.loadEntity(args.accountingSchemeId));
    organization.registration = args.registration;
    organization.displayName = args.displayName;
    organization.legalName = args.legalName;
    organization.legalAddress = Promise.resolve(await this.getInjector().addressService.save(args.legalAddress));
    organization.bankAccount = Promise.resolve(await this.loadBankAccount(args.bankAccountId));
    organization.idNumber = args.idNumber;

    return organization;
  }

  typeName(): string {
    return OrganizationServiceKey;
  }

}
