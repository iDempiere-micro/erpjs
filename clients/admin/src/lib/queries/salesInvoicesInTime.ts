import gql from 'graphql-tag';

export const QUERY = gql`
    query {
        salesInvoicesReport {
            group
            date
            value
        }
    }
`;

export const mock = {
    data: {
        salesInvoicesReport: [
            {
                group: 'NUCZ',
                date: '2021-01-01',
                value: 181133.25,
            },
            {
                group: 'NUCZ',
                date: '2020-10-01',
                value: 174196.77,
            },
            {
                group: 'DP',
                date: '2020-09-01',
                value: 27000,
            },
            {
                group: 'DP',
                date: '2020-12-01',
                value: 184157.5,
            },
            {
                group: 'DP',
                date: '2021-01-01',
                value: 195200,
            },
            {
                group: 'DP',
                date: '2020-08-01',
                value: 200668.75,
            },
            {
                group: 'DP',
                date: '2020-11-01',
                value: 170350,
            },
            {
                group: 'DP',
                date: '2020-10-01',
                value: 872814.5,
            },
            {
                group: 'NUCZ',
                date: '2020-12-01',
                value: 358755.43,
            },
            {
                group: 'NUCZ',
                date: '2020-09-01',
                value: 869492.93,
            },
            {
                group: 'NUCZ',
                date: '2020-11-01',
                value: 970779.09,
            },
            {
                group: 'DP',
                date: '2021-02-01',
                value: 25289.21,
            },
            {
                group: 'NUCZ',
                date: '2020-08-01',
                value: 868442.19,
            },
            {
                group: 'NUCZ',
                date: '2021-02-01',
                value: 607202.03000000001,
            },
        ],
    },
};
