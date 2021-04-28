import { query } from 'svelte-apollo';
import type { CustomerByIdQuery } from '../generated/graphql';
import { GET_CUSTOMER_BY_ID } from './queries/customer';
import { throwOnUndefined } from './util';
import { authStore } from './auth';
import type { CustomerListPartsFragment, CustomersQuery } from '../generated/graphql';
import { store } from './store';
import { CUSTOMERS } from './queries/customers';
import type { SelectItem } from './select';

export const getCustomerBy = (id: number) =>
    query<CustomerByIdQuery>(GET_CUSTOMER_BY_ID, { variables: { id } });

export const loadCustomerPhotoContent = async (id: number): Promise<string> => {
    const baseUrl = process.env.API_BASE_URL || throwOnUndefined();
    const result = await fetch(baseUrl.replace('graphql', 'file/customer-photo/' + id), {
        headers: {
            Authorization: 'Bearer ' + (process.env.FAKE_TOKEN || authStore?.get()?.token),
        },
    });
    const { data } = await result.json();
    return data;
};

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

    const customersResult = query<CustomersQuery>(CUSTOMERS);
    customersResult.subscribe((value) => {
        if (value?.data) {
            customersStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                customers: value.data.customers,
            }));
        }
    });
};

export const mapCustomers = (data: CustomerListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];
