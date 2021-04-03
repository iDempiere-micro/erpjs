import type { CustomerListPartsFragment, CustomersQuery } from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import { CUSTOMERS } from './queries/customers';

export const mapCustomers = (data: CustomerListPartsFragment[]) =>
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
