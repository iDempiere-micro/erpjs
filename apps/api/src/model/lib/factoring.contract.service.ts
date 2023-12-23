import { BaseEntityService } from './base.entity.service';
import { FactoringContractModel } from './factoring.contract.model';
import { FactoringContractSaveArgsModel } from './factoring.contract.save.args.model';
import { FactoringContract } from '../generated/entities/FactoringContract';
import { EntityManager, Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import {
  FactoringProviderService,
  FactoringProviderServiceKey,
} from './factoring.provider.service';
import { CustomerService, CustomerServiceKey } from './customer.service';
import {
  OrganizationService,
  OrganizationServiceKey,
} from './organization.service';
import { OrganizationModel } from './organization.model';
import { FactoringProviderModel } from './factoring.provider.model';
import { CustomerModel } from './customer.model';

export const FactoringContractServiceKey = 'FactoringContractService';

export class FactoringContractService extends BaseEntityService<
  FactoringContractModel,
  FactoringContractSaveArgsModel
> {
  constructor(
    @Inject(FactoringProviderServiceKey)
    public readonly factoringProviderService: FactoringProviderService,
    @Inject(CustomerServiceKey)
    public readonly customerService: CustomerService,
    @Inject(OrganizationServiceKey)
    public readonly organizationService: OrganizationService,
  ) {
    super();
  }

  loadEntityByIdRelations(): string[] {
    return ['factoringProvider', 'customer', 'organization'];
  }

  createEntity(): FactoringContractModel {
    return new FactoringContract();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: FactoringContractSaveArgsModel,
    entity: FactoringContractModel,
  ): Promise<FactoringContractModel> {
    entity.customer = await this.customerService.loadEntityById(
      transactionalEntityManager,
      args.customerId,
    );
    entity.factoringProvider =
      await this.factoringProviderService.loadEntityById(
        transactionalEntityManager,
        args.factoringProviderId,
      );
    entity.organization = await this.organizationService.loadEntityById(
      transactionalEntityManager,
      args.organizationId,
    );
    entity.invoicePrintNote = args.invoicePrintNote;
    return entity;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<FactoringContractModel> {
    return transactionalEntityManager.getRepository(
      FactoringContract,
    ) as Repository<FactoringContractModel>;
  }

  typeName(): string {
    return FactoringContractServiceKey;
  }

  async getFactoringContract(
    transactionalEntityManager: EntityManager,
    organization: OrganizationModel,
    factoringProvider: FactoringProviderModel,
    customer: CustomerModel,
  ): Promise<FactoringContractModel> {
    return this.getRepository(transactionalEntityManager)
      .createQueryBuilder('factoringContract')
      .leftJoinAndSelect(
        'factoringContract.factoringProvider',
        'factoringProvider',
      )
      .leftJoinAndSelect('factoringProvider.bankAccount', 'bankAccount')
      .where(
        `factoringContract.organization = :organizationId AND factoringContract.customer = :customerId AND factoringContract.factoringProvider = :factoringProviderId AND factoringContract.isActive=true`,
        {
          organizationId: organization.id,
          customerId: customer.id,
          factoringProviderId: factoringProvider.id,
        },
      )
      .getOne();
  }
}
