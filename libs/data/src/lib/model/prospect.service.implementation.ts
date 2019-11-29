import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { ProspectService } from '@erpjs/model';

@Injectable()
export class ProspectServiceImplementation extends Implement(ProspectService) {}
