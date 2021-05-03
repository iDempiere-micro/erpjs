import type {
    CustomerDetailPartsFragment,
    CustomerListPartsFragment,
} from '../../generated/graphql';
import type { AddressRow } from './address';
import type { CustomerGroupDetail } from './customerGroup';

export interface CustomerDetail extends CustomerDetailPartsFragment {
    safeAddress: AddressRow;
    safeCustomerGroup: CustomerGroupDetail;
}
export type CustomerRow = CustomerListPartsFragment;
