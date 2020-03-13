import { Implement } from './base.service.implementation';
import { CustomerGroupModel, CustomerPriceListService, ProductModel } from '@erpjs/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerPriceListServiceImplementation extends Implement(CustomerPriceListService) {
  constructor() {
    super();
    this.loadByCustomerGroupAndProduct = async (customerGroup: CustomerGroupModel, product: ProductModel) => {
      const productId = product.id;
      const customerGroupId = customerGroup.id;
      console.log('**** productId', productId);
      console.log('**** customerGroupId', customerGroupId);
      const result = await this.getRepository().createQueryBuilder('customerPriceList')
        .leftJoinAndSelect('customerPriceList.customerGroup', 'customerGroup')
        .leftJoinAndSelect('customerPriceList.productPrices', 'customerProductPriceModel')
        .leftJoinAndSelect('customerProductPriceModel.product', 'product')
        .where('product.id=:productId AND customerGroup.id=:customerGroupId', {productId, customerGroupId})
        .getOne();
      console.log('**** result', result);
      return result;
    }

  }
}
