import { BankAccountService } from '@erpjs/model';
import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';

@Injectable()
export class BankAccountServiceImplementation extends Implement(BankAccountService) {
  constructor() {
    super();
    this.getBankAccount = (displayName: string) =>
      this.getRepository().findOne({where: {displayName}})
  }
}
