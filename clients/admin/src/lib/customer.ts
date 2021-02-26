import { apollo } from './apollo';
import { authStore } from './auth';
import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
import { setClient, query } from 'svelte-apollo';
import gql from 'graphql-tag';
import type { ApolloQueryResult } from '@apollo/client';

const GET_CUSTOMER_BY_ID = gql`
    query CustomerById($id: Int!) {
        customer(id: $id) {
            id
            legalName
            displayName
            vatNumber
            invoicingEmail
            legalAddress {
                id
                city
                line1
                zipCode
                country {
                    id
                    isoCode
                }
            }
        }
    }
`;

export const getCustomerBy = (id: number) => query(GET_CUSTOMER_BY_ID, { variables: { id } });
