import gql from 'graphql-tag';
import { mock as mockCustomer } from './customer';
import { mock as mockOrganization } from './organizations';
import { mock1 as mockFactoringProvider } from './factoringProvider';
import { FACTORING_CONTRACT_DETAIL_PARTS_RAW } from '../fragments/factoringContract';

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
                invoicePrintNote: 'This is a factoring invoice',
                customer: mockCustomer.data.customer,
                organization: mockOrganization.data.organizations[0],
                factoringProvider: mockFactoringProvider.data.factoringProvider,
            },
            {
                id: 2,
                invoicePrintNote: 'PAY TO THE FACTORING PROVIDER',
                customer: mockCustomer.data.customer,
                organization: mockOrganization.data.organizations[0],
                factoringProvider: mockFactoringProvider.data.factoringProvider,
            },
        ],
    },
};
