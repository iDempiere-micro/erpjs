import type {
    AccountingSchemeByIdQuery,
    AccountingSchemesQuery,
} from '../../generated/graphql';
import { query } from 'svelte-apollo';
import { ACCOUNTING_SCHEMES } from '../queries/accountingSchemes';
import type { SelectItem } from '../support/select';
import { GET_ACCOUNTING_SCHEME_BY_ID } from '../queries/accountingScheme';
import type { AccountingSchemeRow } from '../model/accountingScheme';
import { ensureEntityStore, init } from './entityStore';

export const accountingSchemesStore = init<AccountingSchemeRow>();

export const ensureAccountingSchemesStore = () => {
    ensureEntityStore<AccountingSchemeRow, AccountingSchemesQuery>(
        accountingSchemesStore,
        ACCOUNTING_SCHEMES,
        (value) => value?.accountingSchemes || []
    );
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
