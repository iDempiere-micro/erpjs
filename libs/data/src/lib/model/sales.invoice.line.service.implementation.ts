import { SalesInvoiceLineService } from '@erpjs/model';
import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';

@Injectable()
export class SalesInvoiceLineServiceImplementation extends Implement(SalesInvoiceLineService) {}
