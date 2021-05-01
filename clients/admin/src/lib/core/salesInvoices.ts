import type { SalesInvoiceByIdQuery } from '../../generated/graphql';
import { GET_SALES_INVOICE_BY_ID } from '../queries/salesInvoice';
import { query } from '../../absorb/svelte-apollo';

export const downloadInvoice = (
    baseUrl: string | undefined,
    token: string | undefined,
    id: number,
) => {
    if (!baseUrl) throw new Error('baseUrl must be specified');
    fetch(baseUrl + '/../file/sales-invoice/' + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((json) => {
            const a = document.createElement('a');
            a.href = `data:application/pdf;base64,${json.data}`;
            a.setAttribute('download', id + '.pdf');
            a.click();
        });
};

export const getSalesInvoiceBy = (id: number) =>
    query<SalesInvoiceByIdQuery>(GET_SALES_INVOICE_BY_ID, { variables: { id } });
