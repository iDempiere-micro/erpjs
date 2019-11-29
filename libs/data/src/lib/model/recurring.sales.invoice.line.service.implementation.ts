import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { RecurringSalesInvoiceLineService } from '@erpjs/model';

@Injectable()
export class RecurringSalesInvoiceLineServiceImplementation extends Implement(RecurringSalesInvoiceLineService){}
