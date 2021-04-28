import { Inject, Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { FactoringProviderModel } from './factoring.provider.model';
import { FactoringProviderSaveArgsModel } from './factoring.provider.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import {
  BankAccountService,
  BankAccountServiceKey,
} from './bank.account.service';
import { FactoringProvider } from '../generated/entities/FactoringProvider';
import { UserModel } from './user.model';
import { OrganizationModel } from './organization.model';
import { CustomerModel } from './customer.model';

export const FactoringProviderServiceKey = 'FactoringProviderService';

@Injectable()
export class FactoringProviderService extends BaseEntityService<
  FactoringProviderModel,
  FactoringProviderSaveArgsModel
> {
  typeName(): string {
    return FactoringProviderServiceKey;
  }
  constructor(
    @Inject(BankAccountServiceKey)
    public readonly bankAccountService: BankAccountService,
  ) {
    super();
  }

  createEntity(): FactoringProviderModel {
    return new FactoringProvider();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: FactoringProviderSaveArgsModel,
    factoringProvider: FactoringProviderModel,
    currentUser: UserModel,
  ): Promise<FactoringProviderModel> {
    factoringProvider.contact = args.contact;
    factoringProvider.displayName = args.displayName;
    factoringProvider.legalName = args.legalName;

    if (!(args.bankAccount || args.newBankAccount || args.bankAccountId)) {
      throw new Error('Bank account not specified');
    }

    factoringProvider.bankAccount =
      args.bankAccount ||
      (args.bankAccountId &&
        (await this.bankAccountService.loadEntityById(
          transactionalEntityManager,
          args.bankAccountId,
        ))) ||
      (args.newBankAccount &&
        (await this.bankAccountService.save(
          transactionalEntityManager,
          args.newBankAccount,
          currentUser,
        )));

    return factoringProvider;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<FactoringProviderModel> {
    return transactionalEntityManager.getRepository(FactoringProvider);
  }

  getFactoringProvider = (
    transactionalEntityManager: EntityManager,
    displayName: string,
    relations?: string[],
  ) =>
    this.getRepository(transactionalEntityManager).findOne({
      where: { displayName },
      relations,
    });

  async getPossibleFactoringProviders(
    transactionalEntityManager: EntityManager,
    organization: OrganizationModel,
    customer: CustomerModel,
  ): Promise<FactoringProviderModel[]> {
    return this.getRepository(transactionalEntityManager)
      .createQueryBuilder('factoringProvider')
      .innerJoinAndSelect(
        'factoringProvider.factoringContracts',
        'factoringContract',
      )
      .where(
        `factoringContract.organization = :organizationId AND factoringContract.customer = :customerId AND factoringContract.isActive=true`,
        {
          organizationId: organization.id,
          customerId: customer.id,
        },
      )
      .getMany();
  }
}
