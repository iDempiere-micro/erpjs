import type { DocumentNode } from '@apollo/client/core';
import type {
    AccountingSchemeByIdQuery,
    AccountingSchemesQuery,
    SaveAccountingSchemeMutation,
    SaveAccountingSchemeMutationVariables,
} from '../../generated/graphql';
import type { AccountingSchemeDetail, AccountingSchemeRow } from '../model/accountingScheme';
import { GET_ACCOUNTING_SCHEME_BY_ID, SAVE_ACCOUNTING_SCHEME } from '../queries/accountingScheme';
import { ACCOUNTING_SCHEMES } from '../queries/accountingSchemes';
import { BaseEntityService } from './entityStore';

class AccountingSchemeService extends BaseEntityService<
    AccountingSchemeDetail,
    AccountingSchemeRow,
    SaveAccountingSchemeMutationVariables,
    AccountingSchemeByIdQuery,
    AccountingSchemesQuery,
    SaveAccountingSchemeMutation
> {
    protected convertDetail(q: AccountingSchemeByIdQuery): AccountingSchemeDetail {
        return q.accountingScheme;
    }

    protected convertListItem(q: AccountingSchemesQuery): AccountingSchemeRow[] {
        return q.accountingSchemes;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_ACCOUNTING_SCHEME_BY_ID;
    }

    getDetailSafeEntity(): AccountingSchemeDetail {
        return { currency: {} } as any;
    }

    protected getListGql(): DocumentNode {
        return ACCOUNTING_SCHEMES;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_ACCOUNTING_SCHEME;
    }
}

export const accountingSchemeService: AccountingSchemeService = new AccountingSchemeService();
