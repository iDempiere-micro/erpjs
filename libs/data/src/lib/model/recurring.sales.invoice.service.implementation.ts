import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { RecurringSalesInvoiceService } from '@erpjs/model';

@Injectable()
export class RecurringSalesInvoiceServiceImplementation extends Implement(RecurringSalesInvoiceService){

}
