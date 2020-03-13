import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { CustomerProductPriceService } from '@erpjs/model';

@Injectable()
export class CustomerProductPriceServiceImplementation extends Implement(CustomerProductPriceService) {
}
