import type { BankByIdQuery, BankListPartsFragment, BanksQuery } from '../../generated/graphql';

import { store } from '../support/store';
import { BANKS } from '../queries/banks';
import type { SelectItem } from '../support/select';
import { GET_BANK_BY_ID } from '../queries/bank';
import { query } from '../../absorb/svelte-apollo';

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
        if (value?.error) throw new Error(`${value?.error}`);
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

export const getBankBy = (id: number) =>
    query<BankByIdQuery>(GET_BANK_BY_ID, { variables: { id } });