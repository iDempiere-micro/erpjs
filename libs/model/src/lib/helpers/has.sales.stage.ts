import { SalesStageModel } from '../entities/sales.stage.model';

export interface HasSalesStage {
  salesStage: Promise<SalesStageModel>
}
