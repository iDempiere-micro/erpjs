import gql from 'graphql-tag';
import type {
    CountryByIdQuery,
    CountryListPartsFragment,
    CountriesQuery,
} from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import { COUNTRY_DETAIL_PARTS } from './fragments';
import { PRODUCTS } from './queries/countries';
import type { SelectItem } from './select';

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

    const countriesResult = query<CountriesQuery>(PRODUCTS);
    countriesResult.subscribe((value) => {
        if (value?.data) {
            countriesStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                countries: value.data.countries,
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

const GET_COUNTRY_BY_ID = gql`
    ${COUNTRY_DETAIL_PARTS}
    query countryById($id: Int!) {
        country(id: $id) {
            ...CountryDetailParts
        }
    }
`;

export const getCountryBy = (id: number) =>
    query<CountryByIdQuery>(GET_COUNTRY_BY_ID, { variables: { id } });
