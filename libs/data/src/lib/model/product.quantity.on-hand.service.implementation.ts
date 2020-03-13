import { Injectable } from '@nestjs/common';
import { Implement } from '@erp/data/src/lib/model/base.service.implementation';
import { ProductModel, ProductQuantityOnHandService, WarehouseModel } from '@erpjs/model';
import { ProductQuantityOnHandHistoryModel } from '@erp/model/src/lib/entities/product.quantity.on-hand.history.model';

@Injectable()
export class ProductQuantityOnHandServiceImplementation extends Implement(ProductQuantityOnHandService) {
  constructor() {
    super();

    this.createAndSaveHistoryRecord = async (historyModel: ProductQuantityOnHandHistoryModel) => {
      // TODO: implement
    };
    this.loadByProductAndWarehouse = async (product: ProductModel, warehouse: WarehouseModel) => {
      return this.getRepository().findOne({where: {product, warehouse}})
    };
  }
}
