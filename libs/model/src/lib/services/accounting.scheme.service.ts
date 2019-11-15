import { AccountingSchemeSaveArgsModel } from '../args/accounting.scheme.save.args.model';
import { BaseEntityServiceImplementation } from './base.entity.service';
import { AccountingSchemeModel } from '../entities/accounting.scheme.model';

export const AccountingSchemeServiceKey = 'AccountingSchemeService';

export class AccountingSchemeService extends BaseEntityServiceImplementation<AccountingSchemeModel, AccountingSchemeSaveArgsModel> {
  typeName(): string {
    return AccountingSchemeServiceKey;
  }
  async doSave(newAccountingScheme: AccountingSchemeSaveArgsModel, accountingScheme: AccountingSchemeModel): Promise<AccountingSchemeModel> {
    accountingScheme.displayName = newAccountingScheme.displayName;
    accountingScheme.currency = Promise.resolve(newAccountingScheme.currency ? newAccountingScheme.currency :
      await this.loadCurrencyByIsoCode(newAccountingScheme.currencyIsoCode));
    return accountingScheme;
  }
}
