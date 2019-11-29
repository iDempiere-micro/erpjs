import { Injectable } from '@nestjs/common';
import { CustomerService } from '@erpjs/model';
import { Implement } from './base.service.implementation';

@Injectable()
export class CustomerServiceImplementation
  extends Implement(CustomerService) {
  constructor() {
    super();
    this.getCustomer = (displayName: string) =>
      this.getRepository().findOne({where: {displayName}})
  }

}
