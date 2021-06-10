import type { AddressListPartsFragment } from '../../generated/graphql';
import type { AddressRow } from '../model/address';

export const addressOneLiner = (address: AddressListPartsFragment | undefined | null) =>
    address
        ? `${address.line1}, ${address.country.isoCode}-${address.zipCode} ${address.city}`
        : '';

export const addressService = {
    getDetailSafeEntity: (): AddressRow => {
        return { country: {} } as any;
    },
};
