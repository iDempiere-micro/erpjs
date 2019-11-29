import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { LeadService } from '@erpjs/model';

@Injectable()
export class LeadServiceImplementation extends Implement(LeadService) {}
