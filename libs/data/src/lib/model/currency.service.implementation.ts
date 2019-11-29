import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { CurrencyService } from '@erpjs/model';

@Injectable()
export class CurrencyServiceImplementation
  extends Implement(CurrencyService) {
  constructor() {
    super();
    this.getCurrency = (isoCode: string) =>
      this.getRepository().findOne({where: {isoCode}})
  }

}

