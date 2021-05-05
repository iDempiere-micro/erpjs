import gql from 'graphql-tag';
import { MENU_DETAIL_PARTS_RAW } from '../fragments/menu';

export const mock = {
    data: {
        menu: [
            {
                id: 1,
                displayName: 'menu.ERPStandard',
                items: [
                    {
                        id: 1,
                        to: '',
                        displayName: 'menu.items.Dashboard',
                    },
                    {
                        id: 2,
                        to: 'customers',
                        displayName: 'menu.items.Customers',
                    },
                    {
                        id: 3,
                        to: 'sales-invoices',
                        displayName: 'menu.items.SalesInvoices',
                    },
                    {
                        id: 4,
                        to: 'settings',
                        displayName: 'menu.items.Settings',
                    },
                ],
            },
        ],
    },
};
export const GET_MENU = gql`
    {
        menu {
            ${MENU_DETAIL_PARTS_RAW}
        }
    }
`;
