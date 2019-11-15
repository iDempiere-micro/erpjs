import { ModelConfiguration } from '../model.configuration';
import { sum } from '../../util';
import { OrderModel } from '../entities/order.model';

export class OrderService {
  constructor(private readonly modelConfiguration: ModelConfiguration) {}

  async calcOrderPriceTotal(order: OrderModel): Promise<number> {
    const productPrices = await this.modelConfiguration.pricingServiceModel.calcProductPrices(order, order);
    const result = sum(( await productPrices.lines ).map(x => x.linePrice ));

    return Promise.resolve(result);
  }
}
