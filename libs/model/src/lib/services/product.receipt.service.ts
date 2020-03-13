import { BaseEntityServiceImplementation } from './base.entity.service';
import { ProductReceiptModel } from '../entities/product.receipt.model';
import { ProductReceiptSaveArgsModel } from '../args/product.receipt.save.args.model';
import { ProductMovementDirection } from '../helpers/product.movement.model';

export const ProductReceiptServiceKey = 'ProductReceiptService';

export class ProductReceiptService extends BaseEntityServiceImplementation<ProductReceiptModel, ProductReceiptSaveArgsModel> {
  protected async doSave(args: ProductReceiptSaveArgsModel, productReceipt: ProductReceiptModel): Promise<ProductReceiptModel> {
    const { productReceiptLineService } = this.getInjector();
    productReceipt.warehouse = Promise.resolve(args.warehouse);
    productReceipt.displayName = '';
    productReceipt.isConfirmed = false;
    productReceipt.receiptDate = args.movementDate;
    await this.persist(productReceipt);

    const receiptLines = [];
    for(const line1 of args.lines) {
      const line = await productReceiptLineService.save(
        {
          ...line1,
          productReceipt,
          movementDate: args.movementDate,

        }
      );
      receiptLines.push(line);
    }
    productReceipt.lines = Promise.resolve(receiptLines);
    return productReceipt;
  }

  async confirm(productReceipt: ProductReceiptModel) {
    if (productReceipt.isConfirmed) return;
    const { productQuantityOnHandService } = this.getInjector();
    const warehouse = Promise.resolve(await productReceipt.warehouse);
    for( const productReceiptLine of await productReceipt.lines ) {
      const product = Promise.resolve(await productReceiptLine.product);
      await productQuantityOnHandService.save({
        productMovement: {
          warehouse,
          product,
          quantity: productReceiptLine.quantity,
          moveDirection: ProductMovementDirection.receipt,
          movementDate: productReceipt.receiptDate,
        }
      });
    }

    productReceipt.isConfirmed = true;
    await this.persist(productReceipt);
  }

  typeName(): string {
    return ProductReceiptServiceKey;
  }

}

