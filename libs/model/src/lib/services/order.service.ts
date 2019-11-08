import { ModelConfiguration } from '../model.configuration';
import { OrderModel } from '../..';
import { sum } from '../../util';

export class OrderService {
  constructor(private readonly modelConfiguration: ModelConfiguration) {}

  async calcOrderPriceTotal(order: OrderModel): Promise<number> {
    const productPrices = await this.modelConfiguration.pricingServiceModel.calcProductPrices(order, order);
    const result = sum(( await productPrices.lines ).map(x => x.linePrice ));

    return Promise.resolve(result);
  }
}
