import type {
    CustomerDetailPartsFragment,
    CustomerListPartsFragment,
} from '../../generated/graphql';
import type { AddressRow } from './address';

export interface CustomerDetail extends CustomerDetailPartsFragment {
    safeAddress: AddressRow;
}
export type CustomerRow = CustomerListPartsFragment;
