import type {
    CountriesQuery,
    CountryByIdQuery,
    CountryListPartsFragment,
} from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import { COUNTRIES } from './queries/countries';
import type { SelectItem } from './select';
import { GET_COUNTRY_BY_ID } from './queries/country';

export interface WithCountryListPartsFragment {
    loaded: boolean;
    countries: CountryListPartsFragment[];
}

export const countriesStore = store<WithCountryListPartsFragment>({
    loaded: false,
    countries: [],
});
export const ensureCountriesStore = () => {
    if (countriesStore.get().loaded) return;

    const countriesResult = query<CountriesQuery>(COUNTRIES);
    countriesResult.subscribe((value) => {
        if (value?.data) {
            countriesStore.update((x) => ({
                loaded: true,
                countries: value?.data?.countries || [],
            }));
        }
    });
};

export const mapCountries = (data: CountryListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

export const getCountryBy = (id: number) =>
    query<CountryByIdQuery>(GET_COUNTRY_BY_ID, { variables: { id } });
