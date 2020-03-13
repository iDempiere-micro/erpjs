import { BaseEntityServiceImplementation } from './base.entity.service';
import { ProductQuantityOnHandModel } from '../entities/product.quantity.on-hand.model';
import { ProductQuantityOnHandHistoryModel } from '../entities/product.quantity.on-hand.history.model';
import { ProductQuantityOnHandSaveArgsModel } from '../args/product.quantity.on-hand.save.args.model';
import { ProductMovementDirection } from '../helpers/product.movement.model';
import { ProductModel } from '../entities/product.model';
import { WarehouseModel } from '../entities/warehouse.model';

export const ProductQuantityOnHandServiceKey = 'ProductQuantityOnHandService';

export class ProductQuantityOnHandService extends BaseEntityServiceImplementation<ProductQuantityOnHandModel, ProductQuantityOnHandSaveArgsModel> {
  createAndSaveHistoryRecord: (historyModel: ProductQuantityOnHandHistoryModel) => Promise<void>;
  loadByProductAndWarehouse: (product: ProductModel, warehouse: WarehouseModel) => Promise<ProductQuantityOnHandModel>;

  protected async doSave(args: ProductQuantityOnHandSaveArgsModel, newEntity: ProductQuantityOnHandModel): Promise<ProductQuantityOnHandModel> {
    const productMovement = args.productMovement;
    const product = await productMovement.product;
    const warehouse = await productMovement.warehouse;

    const oldState = await this.loadByProductAndWarehouse(product, warehouse);
    const entity = oldState ? oldState : newEntity;

    const delta = productMovement.moveDirection === ProductMovementDirection.issue ? -productMovement.quantity : productMovement.quantity;
    const quantityBefore = entity.quantity ? entity.quantity : 0;
    const quantityAfter = quantityBefore + delta;
    const date = new Date();

    const historyModel: ProductQuantityOnHandHistoryModel = {
      id: null,
      displayName: `${productMovement.moveDirection}-${product.sku}`,
      product: Promise.resolve(product),
      quantityBefore,
      quantityAfter,
      productMovement,
      date,
    };
    await this.createAndSaveHistoryRecord(historyModel);

    entity.quantity = quantityAfter;

    return entity;
  }

  typeName(): string {
    return ProductQuantityOnHandServiceKey;
  }

}
