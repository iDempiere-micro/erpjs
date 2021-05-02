import type {
    AccountingSchemeByIdQuery,
    AccountingSchemesQuery,
    SaveAccountingSchemeMutation,
    SaveAccountingSchemeMutationVariables,
} from '../../generated/graphql';
import { ACCOUNTING_SCHEMES } from '../queries/accountingSchemes';
import type { SelectItem } from '../support/select';
import { GET_ACCOUNTING_SCHEME_BY_ID, SAVE_ACCOUNTING_SCHEME } from '../queries/accountingScheme';
import type { AccountingSchemeDetail, AccountingSchemeRow } from '../model/accountingScheme';
import { ensureEntityRowStore, initRows } from './entityStore';
import { mutation, query, ReadableQuery } from '../../absorb/svelte-apollo';
import type { Mutate } from '../../absorb/svelte-apollo/mutation';

export const accountingSchemesStore = initRows<AccountingSchemeRow>();

export const ensureAccountingSchemesStore = (): void => {
    ensureEntityRowStore<AccountingSchemeRow, AccountingSchemesQuery>(
        accountingSchemesStore,
        ACCOUNTING_SCHEMES,
        (value) => value?.accountingSchemes || [],
    );
};

export const mapAccountingSchemes = (data: AccountingSchemeRow[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

export const getAccountingSchemeBy = (id: number): ReadableQuery<AccountingSchemeByIdQuery> =>
    query<AccountingSchemeByIdQuery>(GET_ACCOUNTING_SCHEME_BY_ID, { variables: { id } });

export const saveAccountingSchemeMutation = (): Mutate<
    SaveAccountingSchemeMutation,
    SaveAccountingSchemeMutationVariables
> =>
    mutation<SaveAccountingSchemeMutation, SaveAccountingSchemeMutationVariables>(
        SAVE_ACCOUNTING_SCHEME,
    );
