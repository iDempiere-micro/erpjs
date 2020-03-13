import { BaseEntityServiceImplementation } from '@erp/model/src/lib/services/base.entity.service';
import { CustomerOrderModel } from '@erp/model/src/lib/entities/customer.order.model';
import { CustomerOrderSaveArgsModel } from '@erp/model/src/lib/args/customer.order.save.args.model';

export const CustomerOrderServiceKey = 'CustomerOrderService';

export class CustomerOrderService extends BaseEntityServiceImplementation<CustomerOrderModel,CustomerOrderSaveArgsModel>  {
  protected async doSave(args: CustomerOrderSaveArgsModel, entity: CustomerOrderModel): Promise<CustomerOrderModel> {
    entity.deliveryAddress = Promise.resolve(args.deliveryAddress);
    entity.customer = Promise.resolve(args.customer);
    entity.currency = Promise.resolve(args.currency);
    entity.displayName = args.displayName;
    entity.grandTotal = entity.grandTotal ? entity.grandTotal : 0;
    entity.grandTotalAccountingSchemeCurrency = entity.grandTotalAccountingSchemeCurrency ? entity.grandTotalAccountingSchemeCurrency : 0;
    entity.isEditByCustomerPossible = entity.isEditByCustomerPossible ? entity.isEditByCustomerPossible : false;
    entity.totalLines = entity.totalLines ? entity.totalLines : 0;
    entity.totalLinesAccountingSchemeCurrency = entity.totalLinesAccountingSchemeCurrency ? entity.totalLinesAccountingSchemeCurrency : 0;
    entity.salesStage = Promise.resolve(args.salesStage);
    return entity;
  }

  typeName(): string {
    return CustomerOrderServiceKey;
  }

}
