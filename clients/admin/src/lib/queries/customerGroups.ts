import gql from 'graphql-tag';
import { CUSTOMER_GROUP_DETAIL_PARTS_RAW } from '../fragments';

export const CUSTOMER_GROUPS = gql`
    {
        customerGroups {
            ${CUSTOMER_GROUP_DETAIL_PARTS_RAW}
        }
    }
`;
export const mock = {
    data: {
        customerGroups: [
            {
                id: 1,
                displayName: 'Expert CustomerGroup',
            },
            {
                id: 2,
                displayName: 'Software CustomerGroup',
            },
        ],
    },
};
