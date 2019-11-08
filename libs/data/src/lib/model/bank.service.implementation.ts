import { Injectable } from '@nestjs/common';
import { BankModel, BankSaveArgsModel, BankService } from '@erpjs/model';
import { Bank } from '../entities/bank';
import { ModelModule } from '@erpjs/data';

@Injectable()
export class BankServiceImplementation extends BankService {
  async createEntity(): Promise<Bank> {
    return new Bank();
  }

  async loadEntity(id: number): Promise<Bank> {
    return ModelModule.getEntityManager().getRepository(Bank).findOne(id);
  }

  async save(args: BankSaveArgsModel): Promise<BankModel> {
    return await ModelModule.getEntityManager().save(await super.save(args));
  }
}
