import { Inject, Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { OrganizationModel } from './organization.model';
import { OrganizationSaveArgsModel } from './organization.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { AddressService, AddressServiceKey } from './address.service';
import { Organization } from './entity.base';
import {
  BankAccountService,
  BankAccountServiceKey,
} from './bank.account.service';
import {
  AccountingSchemeService,
  AccountingSchemeServiceKey,
} from './accounting.scheme.service';

export const OrganizationServiceKey = 'OrganizationService';

@Injectable()
export class OrganizationService extends BaseEntityService<
  OrganizationModel,
  OrganizationSaveArgsModel
> {
  typeName(): string {
    return OrganizationServiceKey;
  }
  constructor(
    @Inject(AddressServiceKey) public readonly addressService: AddressService,
    @Inject(BankAccountServiceKey)
    public readonly bankAccountService: BankAccountService,
    @Inject(AccountingSchemeServiceKey)
    public readonly accountingSchemeService: AccountingSchemeService
  ) {
    super();
  }

  createEntity(): OrganizationModel {
    return new Organization();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: OrganizationSaveArgsModel,
    organization: OrganizationModel
  ): Promise<OrganizationModel> {
    organization.contact = args.contact;
    organization.registration = args.registration;
    organization.displayName = args.displayName;
    organization.legalName = args.legalName;
    organization.legalAddress = await this.addressService.save(
      transactionalEntityManager,
      args.legalAddress
    );
    organization.idNumber = args.idNumber;
    organization.bankAccount =
      args.bankAccount ||
      (await this.bankAccountService.loadEntityById(
        transactionalEntityManager,
        args.bankAccountId
      ));
    organization.accountingScheme =
      args.accountingScheme ||
      (await this.accountingSchemeService.loadEntityById(
        transactionalEntityManager,
        args.accountingSchemeId
      ));
    organization.vatNumber = args.vatNumber;

    return organization;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager
  ): Repository<OrganizationModel> {
    return transactionalEntityManager.getRepository(Organization);
  }

  getOrg = (
    transactionalEntityManager: EntityManager,
    displayName: string,
    relations?: string[]
  ) =>
    this.getRepository(transactionalEntityManager).findOne({
      where: { displayName },
      relations,
    });
}
