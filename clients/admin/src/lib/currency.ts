import gql from 'graphql-tag';
import type { CurrencyListPartsFragment } from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import type { SelectItem } from './select';

const CURRENCIES = gql`
    {
        currencies {
            id
            isoCode
            displayName
        }
    }
`;

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
        ? data.map(({ isoCode, displayName }) => ({
              value: isoCode,
              label: displayName,
          }))
        : [];
