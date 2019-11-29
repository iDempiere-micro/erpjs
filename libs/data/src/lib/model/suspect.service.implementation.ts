import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { SuspectService } from '@erpjs/model';

@Injectable()
export class SuspectServiceImplementation extends Implement(SuspectService) {}
