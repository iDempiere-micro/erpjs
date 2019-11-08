import { ModelConfiguration, OrderService } from '@erpjs/model';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class OrderServiceImplementation extends OrderService {
  constructor( @Inject('ModelConfiguration') modelConfiguration: ModelConfiguration) {
    super(modelConfiguration);
  }
}
