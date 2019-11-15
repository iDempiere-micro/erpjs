import { SalesInvoiceService } from '@erpjs/model';
import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';

@Injectable()
export class SalesInvoiceServiceImplementation extends Implement(SalesInvoiceService) {
}
