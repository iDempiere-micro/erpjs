import { BaseEntityServiceImplementation } from './base.entity.service';
import { ProductReceiptLineModel } from '../entities/product.receipt.line.model';
import { ProductReceiptLineSaveArgsModel } from '../args/product.receipt.save.args.model';
import { ProductMovementDirection } from '../helpers/product.movement.model';

export const ProductReceiptLineServiceKey = 'ProductReceiptLineService';

export class ProductReceiptLineService extends BaseEntityServiceImplementation<ProductReceiptLineModel, ProductReceiptLineSaveArgsModel> {
  protected async doSave(args: ProductReceiptLineSaveArgsModel, entity: ProductReceiptLineModel): Promise<ProductReceiptLineModel> {
    entity.productReceipt = Promise.resolve(args.productReceipt);
    entity.moveDirection = ProductMovementDirection.receipt;
    entity.displayName = '';
    entity.lineTax = Promise.resolve(args.lineTax);
    entity.movementDate = args.movementDate;
    entity.narration = '';
    entity.product = Promise.resolve(args.product);
    entity.quantity = args.quantity;
    entity.linePrice = args.linePrice;
    entity.quantityOnHand = entity.quantity;
    return entity;
  }

  typeName(): string {
    return ProductReceiptLineServiceKey;
  }
}
