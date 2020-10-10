import { CustomerModel } from './customer.model';
import { CustomerSaveArgsModel } from './customer.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';
import { Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { Customer } from './entity.base';
import { AddressService } from './address.service';

export const CustomerServiceKey = 'CustomerService';

@Injectable()
export class CustomerService extends BaseEntityService<
  CustomerModel,
  CustomerSaveArgsModel
> {
  createEntity(): CustomerModel {
    return new Customer();
  }

  protected getRepository(
    transactionalEntityManager
  ): Repository<CustomerModel> {
    return transactionalEntityManager.getRepository(Customer);
  }
  constructor(protected readonly addressService: AddressService) {
    super();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CustomerSaveArgsModel,
    customer: CustomerModel
  ): Promise<CustomerModel> {
    const address = await this.addressService.save(
      transactionalEntityManager,
      args.legalAddress
    );

    customer.displayName = args.displayName;
    customer.vatNumber = args.vatNumber;
    customer.legalName = args.legalName;
    customer.invoicingEmail = args.invoicingEmail;
    customer.legalAddress = address;
    customer.idNumber = args.idNumber;
    return customer;
  }

  typeName(): string {
    return CustomerServiceKey;
  }

  getCustomer = (
    transactionalEntityManager: EntityManager,
    displayName: string,
    relations?: string[]
  ) =>
    this.getRepository(transactionalEntityManager).findOne({
      where: { displayName },
      relations,
    });
}
