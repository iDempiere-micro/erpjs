import { Injectable } from '@nestjs/common';
import { BankService } from '@erpjs/model';
import { Implement } from './base.service.implementation';

@Injectable()
export class BankServiceImplementation extends Implement(BankService) {}
