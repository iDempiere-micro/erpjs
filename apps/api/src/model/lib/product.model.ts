import { BaseModel } from './base.model';

export interface ProductModel extends BaseModel {
  sku: string;
  displayName: string;
}
