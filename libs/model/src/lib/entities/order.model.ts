import { HasCurrency, HasCustomer, HasGrandTotal, HasProductsQuantities, HasSalesStage, HasTotalLines } from '../..';
import { BaseModel } from './base.model';

export interface OrderModel extends HasProductsQuantities, BaseModel,
  HasSalesStage, HasCustomer, HasCurrency, HasTotalLines, HasGrandTotal {
  totalLines: number;
}
