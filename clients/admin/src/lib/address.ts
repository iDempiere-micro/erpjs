import type { AddressListPartsFragment } from '../generated/graphql';

export const addressOneLiner = (address: AddressListPartsFragment | undefined | null) =>
    address
        ? `${address.line1}, ${address.country.isoCode}-${address.zipCode} ${address.city}`
        : '';
