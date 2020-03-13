import { BaseModel } from './base.model';
import { WarehouseModel } from './warehouse.model';
import { ProductIssueLineModel } from './product.issue.line.model';
import { CustomerOrderModel } from './customer.order.model';

export interface ProductIssueModel extends BaseModel {
  lines: Promise<ProductIssueLineModel[]>
  warehouse: Promise<WarehouseModel>;
  isConfirmed: boolean;
  issueDate: Date;
  customerOrder: Promise<CustomerOrderModel>
}
