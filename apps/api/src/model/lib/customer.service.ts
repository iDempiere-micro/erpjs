import { CustomerModel } from './customer.model';
import { CustomerSaveArgsModel } from './customer.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { AddressService, AddressServiceKey } from './address.service';
import { Customer } from '../generated/entities/Customer';
import { UserModel } from './user.model';
import {
  CustomerGroupService,
  CustomerGroupServiceKey,
} from './customer.group.service';

export const CustomerServiceKey = 'CustomerService';

@Injectable()
export class CustomerService extends BaseEntityService<
  CustomerModel,
  CustomerSaveArgsModel
> {
  constructor(
    @Inject(AddressServiceKey)
    protected readonly addressService: AddressService,
    @Inject(CustomerGroupServiceKey)
    protected readonly customerGroupService: CustomerGroupService,
  ) {
    super();
  }

  createEntity(): CustomerModel {
    return new Customer();
  }

  protected getRepository(
    transactionalEntityManager,
  ): Repository<CustomerModel> {
    return transactionalEntityManager.getRepository(Customer);
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CustomerSaveArgsModel,
    customer: CustomerModel,
    currentUser: UserModel,
  ): Promise<CustomerModel> {
    const address =
      args.address &&
      (await this.addressService.save(
        transactionalEntityManager,
        args.address,
        currentUser,
      ));
    const legalAddress = await this.addressService.save(
      transactionalEntityManager,
      args.legalAddress,
      currentUser,
    );

    customer.displayName = args.displayName;
    customer.vatNumber = args.vatNumber;
    customer.legalName = args.legalName;
    customer.invoicingEmail = args.invoicingEmail;
    customer.address = address;
    customer.legalAddress = legalAddress;
    customer.idNumber = args.idNumber;
    customer.customerGroup = args.customerGroupId
      ? await this.customerGroupService.loadEntityById(
          transactionalEntityManager,
          args.customerGroupId,
        )
      : null;
    return customer;
  }

  typeName(): string {
    return CustomerServiceKey;
  }

  getCustomer = (
    transactionalEntityManager: EntityManager,
    displayName: string,
    relations?: string[],
  ) =>
    this.getRepository(transactionalEntityManager).findOne({
      where: { displayName },
      relations,
    });
}
