import gql from 'graphql-tag';

export const BANKS = gql`
    {
        banks {
            id
            displayName
            bankIdentifierCode
        }
    }
`;
export const mock = {
    data: {
        banks: [
            {
                id: 1,
                displayName: 'Expert Bank',
                bankIdentifierCode: 'EE',
            },
            {
                id: 2,
                displayName: 'Software Bank',
                bankIdentifierCode: 'SB',
            },
        ],
    },
};
