import gql from 'graphql-tag';

export const SAVE_ORGANIZATION = gql`
    mutation SaveOrganization(
        $id: Int
        $displayName: String!
        $organizationIdentifierCode: String!
    ) {
        saveOrganization(
            args: {
                id: $id
                displayName: $displayName
                organizationIdentifierCode: $organizationIdentifierCode
            }
        ) {
            id
        }
    }
`;
