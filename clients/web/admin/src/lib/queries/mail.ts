import gql from 'graphql-tag';

export const MAIL_SENT_FROM = gql`
    query {
        mailSentFrom
    }
`;
