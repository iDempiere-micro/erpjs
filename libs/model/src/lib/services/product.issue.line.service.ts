import { BaseEntityServiceImplementation } from './base.entity.service';
import { ProductIssueLineModel } from '../entities/product.issue.line.model';
import { ProductIssueLineSaveArgsModel } from '../args/product.issue.save.args.model';
import { ProductMovementDirection } from '../helpers/product.movement.model';

export const ProductIssueLineServiceKey = 'ProductIssueLineService';

export class ProductIssueLineService extends BaseEntityServiceImplementation<ProductIssueLineModel, ProductIssueLineSaveArgsModel> {
  protected async doSave(args: ProductIssueLineSaveArgsModel, entity: ProductIssueLineModel): Promise<ProductIssueLineModel> {
    entity.productIssue = Promise.resolve(args.productIssue);
    entity.moveDirection = ProductMovementDirection.issue;
    entity.displayName = '';
    entity.movementDate = args.movementDate;
    entity.product = Promise.resolve(args.product);
    entity.quantity = args.quantity;
    entity.linePrice = 0;

    return entity;
  }

  typeName(): string {
    return ProductIssueLineServiceKey;
  }
}
