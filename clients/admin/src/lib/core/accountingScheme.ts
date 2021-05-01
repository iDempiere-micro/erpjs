import type {
    AccountingSchemeByIdQuery,
    AccountingSchemesQuery,
} from '../../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from '../support/store';
import { ACCOUNTING_SCHEMES } from '../queries/accountingSchemes';
import type { SelectItem } from '../support/select';
import { GET_ACCOUNTING_SCHEME_BY_ID } from '../queries/accountingScheme';
import type { AccountingSchemeRow } from '../model/accountingScheme';

export interface WithAccountingSchemeRow {
    loaded: boolean;
    accountingSchemes: AccountingSchemeRow[];
}

export const accountingSchemesStore = store<WithAccountingSchemeRow>({
    loaded: false,
    accountingSchemes: [],
});
export const ensureAccountingSchemesStore = () => {
    if (accountingSchemesStore.get().loaded) return;

    const accountingSchemesResult = query<AccountingSchemesQuery>(ACCOUNTING_SCHEMES);
    accountingSchemesResult.subscribe((value) => {
        if (value?.error) throw new Error(`${value?.error}`);
        if (value?.data) {
            accountingSchemesStore.update((x) => ({
                loaded: (value?.data?.accountingSchemes?.length || 0) > 0,
                accountingSchemes: value?.data?.accountingSchemes || [],
            }));
        }
    });
};

export const mapAccountingSchemes = (data: AccountingSchemeRow[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

export const getAccountingSchemeBy = (id: number) =>
    query<AccountingSchemeByIdQuery>(GET_ACCOUNTING_SCHEME_BY_ID, { variables: { id } });
