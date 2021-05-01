import type { CurrencyByIdQuery, CurrencyListPartsFragment } from '../../generated/graphql';

import { store } from '../support/store';
import type { SelectItem } from '../support/select';
import { CURRENCIES } from '../queries/currencies';
import { GET_CURRENCY_BY_ID } from '../queries/currency';
import { query } from '../../absorb/svelte-apollo';

export interface WithCurrencyListPartsFragmentArray {
    loaded: boolean;
    currencies: CurrencyListPartsFragment[];
}

export const currenciesStore = store<WithCurrencyListPartsFragmentArray>({
    loaded: false,
    currencies: [],
});
export const ensureCurrenciesStore = () => {
    if (currenciesStore.get().loaded) return;

    const currenciesResult = query<any>(CURRENCIES);
    currenciesResult.subscribe((value) => {
        if (value?.error) throw new Error(`${value?.error}`);
        if (value?.data) {
            currenciesStore.update((x) => ({
                loaded: true,
                currencies: value?.data.currencies,
            }));
        }
    });
};
export const mapCurrencies = (data: CurrencyListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

export const getCurrencyBy = (id: number) =>
    query<CurrencyByIdQuery>(GET_CURRENCY_BY_ID, { variables: { id } });
