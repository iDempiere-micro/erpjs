import { BaseSaveArgsModel } from './base.save.args.model';
import { ProductModel } from '../entities/product.model';
import { ProductIssueModel } from '../entities/product.issue.model';
import { WarehouseModel } from '../entities/warehouse.model';
import { CustomerOrderModel } from '../entities/customer.order.model';

export interface ProductIssueLineSaveModel extends BaseSaveArgsModel {
  product: ProductModel
  quantity: number
}

export interface ProductIssueLineSaveArgsModel extends ProductIssueLineSaveModel {
  productIssue: ProductIssueModel
  movementDate: Date
}

export interface ProductIssueSaveArgsModel extends BaseSaveArgsModel {
  warehouse: WarehouseModel
  movementDate: Date
  lines: Array<ProductIssueLineSaveModel>
  customerOrder: CustomerOrderModel
}
