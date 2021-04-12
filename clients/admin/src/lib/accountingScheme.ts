import gql from 'graphql-tag';
import type {
    AccountingSchemeByIdQuery,
    AccountingSchemeListPartsFragment,
    AccountingSchemesQuery,
} from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import { BANK_DETAIL_PARTS, UNIT_OF_MEASUREMENT_DETAIL_PARTS } from './fragments';
import { ACCOUNTING_SCHEMES } from './queries/accountingSchemes';
import type { SelectItem } from './select';

export interface WithAccountingSchemeListPartsFragment {
    loaded: boolean;
    accountingSchemes: AccountingSchemeListPartsFragment[];
}

export const accountingSchemesStore = store<WithAccountingSchemeListPartsFragment>({
    loaded: false,
    accountingSchemes: [],
});
export const ensureAccountingSchemesStore = () => {
    if (accountingSchemesStore.get().loaded) return;

    const accountingSchemesResult = query<AccountingSchemesQuery>(ACCOUNTING_SCHEMES);
    accountingSchemesResult.subscribe((value) => {
        if (value?.data) {
            accountingSchemesStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                accountingSchemes: value.data.accountingSchemes,
            }));
        }
    });
};

export const mapAccountingSchemes = (data: AccountingSchemeListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

const GET_BANK_BY_ID = gql`
    ${BANK_DETAIL_PARTS}
    query accountingSchemeById($id: Int!) {
        accountingScheme(id: $id) {
            ...AccountingSchemeDetailParts
        }
    }
`;

export const getAccountingSchemeBy = (id: number) =>
    query<AccountingSchemeByIdQuery>(GET_BANK_BY_ID, { variables: { id } });
