import { Inject, Injectable } from '@nestjs/common';
import { Message } from '@erpjs/api-interfaces';
import { ModelConfiguration, OrderService } from '@erpjs/model';
import { NullPricingService } from './null.pricing.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('ModelConfiguration') private readonly modelConfiguration: ModelConfiguration,
    @Inject('OrderService') private readonly orderService : OrderService,
    private readonly nullPricingService: NullPricingService,
  ) {
    modelConfiguration.pricingServiceModel = nullPricingService;
  }

  async getData(): Promise<Message> {
    return { message: 'Welcome to api!:' +  await this.orderService.calcOrderPriceTotal(null) };
  }
}
