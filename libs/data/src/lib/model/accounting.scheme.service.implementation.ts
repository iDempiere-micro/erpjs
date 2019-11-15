import { Implement } from './base.service.implementation';
import { AccountingSchemeService } from '@erpjs/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountingSchemeServiceImplementation extends Implement(AccountingSchemeService) {

}
