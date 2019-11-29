import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { AccountService } from '@erpjs/model';

@Injectable()
export class AccountServiceImplementation extends Implement(AccountService)
{
  constructor() {
    super();

    this.getAccountByCode = (code:String) => {
      return this.getRepository().findOne({where:{code}});
    }
  }
}
