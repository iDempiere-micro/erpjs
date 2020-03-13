import { TaxService } from '@erpjs/model';
import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';

@Injectable()
export class TaxServiceImplementation extends Implement(TaxService) {
  constructor() {
    super();
    this.getZeroTax = async () => await this.getRepository().findOne({where: {ratePercent: 0}});
    this.getStandardTax = async () => await this.getRepository().findOne({where: {isStandard: true}});
  }
}
