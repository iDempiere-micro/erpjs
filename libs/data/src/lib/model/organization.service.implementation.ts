import { OrganizationService } from '@erpjs/model';
import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';


@Injectable()
export class OrganizationServiceImplementation extends Implement(OrganizationService) {
  constructor() {
    super();
    this.getOrg = (displayName: string) =>
      this.getRepository().findOne({where: {displayName}})
  }
}
