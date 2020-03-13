import { BaseEntityServiceImplementation } from './base.entity.service';
import { CustomerPriceListModel } from '../entities/customer.price.list.model';
import { CustomerPriceListSaveArgsModel } from '../args/customer.price.list.save.args.model';
import { CustomerGroupModel } from '../entities/customer.group.model';
import { ProductModel } from '../entities/product.model';

const { map } = require('p-iteration');

export const CustomerPriceListServiceKey = 'CustomerPricelistService';

export class CustomerPriceListService extends
  BaseEntityServiceImplementation<CustomerPriceListModel,CustomerPriceListSaveArgsModel>  {
  loadByCustomerGroupAndProduct: (customerGroup: CustomerGroupModel, product: ProductModel) => Promise<CustomerPriceListModel>;

  protected async doSave(args: CustomerPriceListSaveArgsModel, entity: CustomerPriceListModel): Promise<CustomerPriceListModel> {
    const {customerGroupService, productService, customerProductPriceService} = this.getInjector();
    entity.customerGroup =
      Promise.resolve(
        args.customerGroup ? args.customerGroup : await customerGroupService.loadCustomerGroup(args.customerGroupDisplayName)
      );
    entity.validFrom = args.validFrom;
    entity.validTo = args.validTo;
    entity.displayName = args.displayName;

    await this.persist(entity);

    entity.productPrices = await map(
      args.productPrices,
      async productPrice => await customerProductPriceService.save({
        sellingPrice: productPrice.sellingPrice,
        product: productPrice.product ? productPrice.product : await productService.getProduct(productPrice.productSKU),
        customerPriceList: entity
      })
    );

    return entity;
  }

  typeName(): string {
    return CustomerPriceListServiceKey;
  }

}
