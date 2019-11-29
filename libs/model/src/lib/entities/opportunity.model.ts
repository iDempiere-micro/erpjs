/**
 *  The right person who is ready to buy
 */
import { BaseModel } from './base.model';
import { CurrencyModel } from './currency.model';
import { ProductModel } from './product.model';

export interface OpportunityModel extends BaseModel {
  company: string;
  email: string;
  phone: string;
  budget: number;
  currency: Promise<CurrencyModel>;
  closingDate: Date;
  solution: Promise<ProductModel>;
}
