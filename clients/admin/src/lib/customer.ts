import { query } from 'svelte-apollo';
import type { CustomerByIdQuery } from '../generated/graphql';
import { GET_CUSTOMER_BY_ID } from './queries/customer';
import { throwOnUndefined } from './util';
import { authStore } from './auth';

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
