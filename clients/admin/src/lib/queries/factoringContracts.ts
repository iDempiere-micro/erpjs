import gql from 'graphql-tag';
import { FACTORING_CONTRACT_DETAIL_PARTS_RAW } from '../fragments';

export const FACTORING_CONTRACTS = gql`
    {
        factoringContracts {
            ${FACTORING_CONTRACT_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock = {
    data: {
        factoringContracts: [
            {
                id: 1,
                displayName: 'Expert FactoringContract',
                currency: {
                    id: 1,
                    isoCode: 'ABC',
                    displayName: 'ABC Currency',
                },
            },
            {
                id: 2,
                displayName: 'Software FactoringContract',
                currency: {
                    id: 2,
                    isoCode: 'DEF',
                    displayName: 'Currency DEF',
                },
            },
        ],
    },
};
