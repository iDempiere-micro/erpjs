import gql from 'graphql-tag';
import { SALES_INVOICE_DETAIL_PARTS } from '../fragments';

export const CONFIRM_SALES_INVOICE = gql`
    ${SALES_INVOICE_DETAIL_PARTS}

    mutation ConfirmSalesInvoice($id: Int!) {
        confirmSalesInvoice(args: { id: $id }) {
            ...SalesInvoiceDetailParts
        }
    }
`;
