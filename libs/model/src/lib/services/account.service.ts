import { BaseEntityServiceImplementation } from './base.entity.service';
import { AccountModel } from '../entities/account.model';
import { AccountSaveArgsModel } from '../args/account.save.args.model';

export const AccountServiceKey = 'AccountService';

export class AccountService extends BaseEntityServiceImplementation<AccountModel, AccountSaveArgsModel> {
  getAccountByCode: (code:String) => Promise<AccountModel>;

  protected async doSave(args: AccountSaveArgsModel, entity: AccountModel): Promise<AccountModel> {
    const { accountingSchemeService } = this.getInjector();
    entity.accountingScheme =
      Promise.resolve(
        args.accountingScheme ? args.accountingScheme : await accountingSchemeService.loadEntity(args.accountingSchemeId)
      );
    entity.code = args.code;
    entity.displayName = args.displayName;
    return entity;
  }

  typeName(): string {
    return AccountServiceKey;
  }
}
