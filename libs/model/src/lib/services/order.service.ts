import { ModelConfiguration } from '../model.configuration';
import { sum } from '../../util';
import { CustomerOrderModel } from '../entities/customer.order.model';

export class OrderService {
  constructor(private readonly modelConfiguration: ModelConfiguration) {}

  async calcOrderPriceTotal(order: CustomerOrderModel): Promise<number> {
    const productPrices = await this.modelConfiguration.pricingServiceModel.calcProductPrices(order, order);
    const result = sum(( await productPrices.lines ).map(x => x.linePrice ));

    return Promise.resolve(result);
  }
}
