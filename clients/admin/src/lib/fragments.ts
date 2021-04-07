import gql from 'graphql-tag';

export const UNIT_OF_MEASUREMENT_DETAIL_PARTS = gql`
    fragment UnitOfMeasurementDetailParts on UnitOfMeasurement {
        id
        displayName
    }
`;

export const PRODUCT_DETAIL_PARTS = gql`
    fragment ProductDetailParts on Product {
        id
        displayName
        sku
        defaultUoM {
            ...UnitOfMeasurementDetailParts
        }
    }
`;

export const COUNTRY_DETAIL_PARTS = gql`
    fragment CountryDetailParts on Country {
        id
        displayName
        isoCode
    }
`;
