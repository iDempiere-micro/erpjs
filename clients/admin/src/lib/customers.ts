import type { CustomerListPartsFragment, CustomersQuery } from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import { CUSTOMERS } from './queries/customers';
import type { SelectItem } from './select';
import gql from 'graphql-tag';

export const mapCustomers = (data: CustomerListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ displayName }) => ({
              value: displayName,
              label: displayName,
          }))
        : [];

export interface WithCustomerListPartsFragment {
    loaded: boolean;
    customers: CustomerListPartsFragment[];
}

export const customersStore = store<WithCustomerListPartsFragment>({
    loaded: false,
    customers: [],
});
export const ensureCustomersStore = () => {
    if (customersStore.get().loaded) return;

    const productsResult = query<CustomersQuery>(CUSTOMERS);
    productsResult.subscribe((value) => {
        if (value?.data) {
            customersStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                customers: value.data.customers,
            }));
        }
    });
};
export const GET_CUSTOMERS_BY_ARGS = gql`
    query CustomersByArgs($displayName: String, $legalName: String) {
        customersByArgs(displayName: $displayName, legalName: $legalName) {
            id
        }
    }
`;
