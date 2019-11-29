import { BaseModel } from './base.model';
import { CurrencyModel } from './currency.model';

/**
 * The right person with the ability to buy.
 */
export interface LeadModel extends BaseModel {
  company: string;
  email: string;
  phone: string;
  budget: number;
  currency: Promise<CurrencyModel>;
  problemToSolve: string;
  expectedSolution: string;
}
