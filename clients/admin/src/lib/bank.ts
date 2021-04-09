import gql from 'graphql-tag';
import type { BankByIdQuery, BankListPartsFragment, BanksQuery } from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import { BANK_DETAIL_PARTS, UNIT_OF_MEASUREMENT_DETAIL_PARTS } from './fragments';
import { BANKS } from './queries/banks';
import type { SelectItem } from './select';

export interface WithBankListPartsFragment {
    loaded: boolean;
    banks: BankListPartsFragment[];
}

export const banksStore = store<WithBankListPartsFragment>({
    loaded: false,
    banks: [],
});
export const ensureBanksStore = () => {
    if (banksStore.get().loaded) return;

    const banksResult = query<BanksQuery>(BANKS);
    banksResult.subscribe((value) => {
        if (value?.data) {
            banksStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                banks: value.data.banks,
            }));
        }
    });
};

export const mapBanks = (data: BankListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

const GET_BANK_BY_ID = gql`
    ${BANK_DETAIL_PARTS}
    query bankById($id: Int!) {
        bank(id: $id) {
            ...BankDetailParts
        }
    }
`;

export const getBankBy = (id: number) =>
    query<BankByIdQuery>(GET_BANK_BY_ID, { variables: { id } });
