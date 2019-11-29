import { BaseSaveArgsModel } from './base.save.args.model';
import { CurrencyModel } from '../entities/currency.model';

export interface LeadSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  company: string;
  email: string;
  phone: string;
  budget: number;
  currencyId?: number;
  currency?: CurrencyModel;
  problemToSolve: string;
  expectedSolution: string;
}
