import { BaseSaveArgsModel } from './base.save.args.model';

export interface ProductSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  sku: string;
}
