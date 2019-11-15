import { Injectable } from '@nestjs/common';
import { CountryService } from '@erpjs/model';
import { ModelModule } from '@erpjs/data';
import { Implement } from './base.service.implementation';

@Injectable()
export class CountryServiceImplementation extends Implement(CountryService) {
  constructor() {
    super();
    this.getCountry = async(isoCode: string) =>
      this.implementation.getRepository(ModelModule.getEntityManager()).findOne({where: {isoCode}})
  }
}
