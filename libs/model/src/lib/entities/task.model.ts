import { BaseModel, ProductQuantityPriceTaxModel } from '@erpjs/model';
import { WorkLogModel } from './work.log.model';

export interface TaskModel extends BaseModel {
  workLogs: Promise<Array<WorkLogModel>>;
  invoiceLines: Promise<Array<ProductQuantityPriceTaxModel>>;
}
