import gql from 'graphql-tag';
import { COUNTRY_DETAIL_PARTS_RAW } from '../fragments';
import { mock } from './countries';

export const GET_COUNTRY_BY_ID = gql`
    
    query countryById($id: Int!) {
        country(id: $id) {
            ${COUNTRY_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock1 = {
    data: {
        country: mock.data.countries[0],
    },
};

export const SAVE_COUNTRY = gql`
    mutation SaveCountry($id: Int, $displayName: String!, $isoCode: String!) {
        saveCountry(args: { id: $id, displayName: $displayName, isoCode: $isoCode }) {
            id
        }
    }
`;
