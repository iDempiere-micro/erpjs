import type {
    CustomerGroupByIdQuery,
    CustomerGroupListPartsFragment,
    CustomerGroupsQuery,
} from '../../generated/graphql';
import { query, ReadableQuery } from 'svelte-apollo';
import { store } from '../support/store';
import { CUSTOMER_GROUPS } from '../queries/customerGroups';
import type { SelectItem } from '../support/select';
import { GET_CUSTOMER_GROUP_BY_ID } from '../queries/customerGroup';

export interface WithCustomerGroupListPartsFragment {
    loaded: boolean;
    customerGroups: CustomerGroupListPartsFragment[];
}

export const customerGroupsStore = store<WithCustomerGroupListPartsFragment>({
    loaded: false,
    customerGroups: [],
});
export const ensureCustomerGroupsStore = () => {
    if (customerGroupsStore.get().loaded) return;

    const customerGroupsResult = query<CustomerGroupsQuery>(CUSTOMER_GROUPS);
    customerGroupsResult.subscribe((value) => {
        if (value?.error) throw new Error(`${value?.error}`);
        if (value?.data) {
            customerGroupsStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                customerGroups: value.data.customerGroups,
            }));
        }
    });
};

export const mapCustomerGroups = (data: CustomerGroupListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

export const getCustomerGroupBy = (id: number): ReadableQuery<CustomerGroupByIdQuery> =>
    query<CustomerGroupByIdQuery>(GET_CUSTOMER_GROUP_BY_ID, { variables: { id } });
