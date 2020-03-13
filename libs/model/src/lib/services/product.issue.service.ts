import { BaseEntityServiceImplementation } from './base.entity.service';
import { ProductIssueModel } from '../entities/product.issue.model';
import { ProductIssueSaveArgsModel } from '../args/product.issue.save.args.model';
import { ProductMovementDirection } from '../helpers/product.movement.model';

export const ProductIssueServiceKey = 'ProductIssueService';

export class ProductIssueService extends BaseEntityServiceImplementation<ProductIssueModel, ProductIssueSaveArgsModel> {
  protected async doSave(args: ProductIssueSaveArgsModel, productIssue: ProductIssueModel): Promise<ProductIssueModel> {
    const { productIssueLineService } = this.getInjector();
    productIssue.warehouse = Promise.resolve(args.warehouse);
    productIssue.displayName = '';
    productIssue.isConfirmed = false;
    productIssue.issueDate = args.movementDate;
    productIssue.customerOrder = Promise.resolve(args.customerOrder);
    await this.persist(productIssue);

    const issueLines = [];
    for(const line1 of args.lines) {
      const line = await productIssueLineService.save(
        {
          ...line1,
          productIssue,
          movementDate: args.movementDate,

        }
      );
      issueLines.push(line);
    }
    productIssue.lines = Promise.resolve(issueLines);
    return productIssue;
  }

  async confirm(productIssue: ProductIssueModel) {
    if (productIssue.isConfirmed) return;
    const {
      productQuantityOnHandService,
      fifoCostsOfGoodsSoldService,
      productReceiptLineService,
      productIssueLineService,
    } = this.getInjector();
    const w = await productIssue.warehouse;
    const warehouse = Promise.resolve(w);
    for( const productIssueLine of await productIssue.lines ) {
      const product = Promise.resolve(await productIssueLine.product);
      await productQuantityOnHandService.save({
        productMovement: {
          warehouse,
          product,
          quantity: productIssueLine.quantity,
          moveDirection: ProductMovementDirection.issue,
          movementDate: productIssue.issueDate,
        }
      });
      const {costsOfGoodsSold, receiptLinesModified,} =
        await fifoCostsOfGoodsSoldService.calculateFifoCostsOfGoodsSold(
          productIssueLine,
          await productReceiptLineService.loadEntities(),
          w
        );
      productIssueLine.linePrice = costsOfGoodsSold;
      await productIssueLineService.persist(productIssueLine);
      for ( const receiptLineModified of receiptLinesModified ) {
        await productReceiptLineService.persist(receiptLineModified);
      }
    }

    productIssue.isConfirmed = true;
    await this.persist(productIssue);
  }

  typeName(): string {
    return ProductIssueServiceKey;
  }

}

