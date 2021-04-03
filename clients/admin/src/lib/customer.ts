import { query } from 'svelte-apollo';
import type { CustomerByIdQuery } from '../generated/graphql';
import { readable } from 'svelte/store';
import { GET_CUSTOMER_BY_ID, mock } from './queries/customer';

export const getCustomerBy = (id: number) =>
    query<CustomerByIdQuery>(GET_CUSTOMER_BY_ID, { variables: { id } });
