import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { CurrencyService } from '@erpjs/model';
import { ModelModule } from '@erpjs/data';

@Injectable()
export class CurrencyServiceImplementation
  extends Implement(CurrencyService) {
  constructor() {
    super();
    this.getCurrency = (isoCode: string) =>
      this.implementation.getRepository(ModelModule.getEntityManager()).findOne({where: {isoCode}})
  }

}

