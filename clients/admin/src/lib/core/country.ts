import { GET_COUNTRY_BY_ID, SAVE_COUNTRY } from '../queries/country';
import type { CountryDetail, CountryRow } from '../model/country';
import { BaseEntityService } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';
import { COUNTRIES } from '../queries/countries';
import type {
    CountriesQuery,
    CountryByIdQuery,
    SaveCountryMutation,
    SaveCountryMutationVariables,
} from '../../generated/graphql';

class CountryService extends BaseEntityService<
    CountryDetail,
    CountryRow,
    SaveCountryMutationVariables,
    CountryByIdQuery,
    CountriesQuery,
    SaveCountryMutation
> {
    protected convertDetail(q: CountryByIdQuery): CountryDetail {
        return q.country;
    }

    protected convertListItem(q: CountriesQuery): CountryRow[] {
        return q.countries;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_COUNTRY_BY_ID;
    }

    getDetailSafeEntity(): CountryDetail {
        return { currency: {} } as any;
    }

    protected getListGql(): DocumentNode {
        return COUNTRIES;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_COUNTRY;
    }
}

export const countryService: CountryService = new CountryService();
