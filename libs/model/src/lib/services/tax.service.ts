import { TaxSaveArgsModel } from '../args/tax.save.args.model';
import { BaseEntityServiceImplementation } from './base.entity.service';
import { TaxModel } from '../entities/tax.model';

export const TaxServiceKey = 'TaxService';

export class TaxService extends BaseEntityServiceImplementation<TaxModel, TaxSaveArgsModel> {
  getZeroTax: () => Promise<TaxModel>;

  protected async doSave(args: TaxSaveArgsModel, tax: TaxModel): Promise<TaxModel> {
    tax.ratePercent = args.ratePercent;
    tax.displayName = args.displayName;
    return  tax;
  }

  typeName(): string {
    return TaxServiceKey;
  }
}
