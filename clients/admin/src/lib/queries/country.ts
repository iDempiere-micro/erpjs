import gql from 'graphql-tag';
import { COUNTRY_DETAIL_PARTS } from '../fragments';

export const GET_COUNTRY_BY_ID = gql`
    ${COUNTRY_DETAIL_PARTS}
    query countryById($id: Int!) {
        country(id: $id) {
            ...CountryDetailParts
        }
    }
`;
