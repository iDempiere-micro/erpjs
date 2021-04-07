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

export const COUNTRY_LIST_PARTS = gql`
    fragment CountryListParts on Country {
        id
        displayName
        isoCode
    }
`;

export const ADDRESS_LIST_PARTS = gql`
    fragment AddressListParts on Address {
        id
        city
        line1
        zipCode
        country {
            ...CountryListParts
        }
    }
`;

export const CUSTOMER_DETAIL_PARTS = gql`
    fragment CustomerDetailParts on Customer {
        id
        legalName
        displayName
        vatNumber
        idNumber
        invoicingEmail
        legalAddress {
            ...AddressListParts
        }
        address {
            ...AddressListParts
        }
        note
    }
`;
