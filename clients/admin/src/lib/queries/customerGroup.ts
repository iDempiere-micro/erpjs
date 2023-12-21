import gql from 'graphql-tag';
import { mock as mockCustomers } from './customers';
import { CUSTOMER_GROUP_DETAIL_PARTS_RAW } from '../fragments';

export const SAVE_CUSTOMER_GROUP = gql`
    mutation SaveCustomerGroup($id: Int, $displayName: String!) {
        saveCustomerGroup(args: { id: $id, displayName: $displayName }) {
            id
        }
    }
`;

export const mock = {
    data: {
        saveCustomerGroup: {
            id: 999,
        },
    },
};

export const GET_CUSTOMER_GROUP_BY_ID = gql`
    query customerGroupById($id: Int!) {
        customerGroup(id: $id) {
            ${CUSTOMER_GROUP_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock1 = {
    data: {
        customerGroup: {
            id: 999,
            displayName: 'TestDisplayName123',
            customers: mockCustomers.data.customers[0],
        },
    },
};
