import { BankAccountService, Injector } from '@erpjs/model';
import { Injectable } from '@nestjs/common';
import { BankAccount } from '../entities/bank.account';
import { ModelModule } from '@erpjs/data';

@Injectable()
export class BankAccountServiceImplementation extends BankAccountService {
  async createEntity(): Promise<BankAccount> {
    return new BankAccount();
  }

  getInjector(): Injector {
    return ModelModule.getInjector();
  }

  async loadEntity(id: number): Promise<BankAccount> {
    return ModelModule.getEntityManager().getRepository(BankAccount).findOne(id);
  }

}
