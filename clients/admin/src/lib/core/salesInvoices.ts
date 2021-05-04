import type {
    SalesInvoiceByIdQuery,
    SalesInvoicesQuery,
    SaveSalesInvoiceMutation,
    SaveSalesInvoiceMutationVariables,
} from '../../generated/graphql';
import { GET_SALES_INVOICE_BY_ID } from '../queries/salesInvoice';
import { query } from '../../absorb/svelte-apollo';
import { BaseEntityService } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';
import { GET_BANK_BY_ID, SAVE_BANK } from '../queries/bank';
import { BANKS } from '../queries/banks';
import type { SalesInvoiceDetail, SalesInvoiceRow } from '../model/salesInvoice';

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

class SalesInvoiceService extends BaseEntityService<
    SalesInvoiceDetail,
    SalesInvoiceRow,
    SaveSalesInvoiceMutationVariables,
    SalesInvoiceByIdQuery,
    SalesInvoicesQuery,
    SaveSalesInvoiceMutation
> {
    protected convertDetail(q: SalesInvoiceByIdQuery): SalesInvoiceDetail {
        return q.salesInvoice;
    }

    protected convertListItem(q: SalesInvoicesQuery): SalesInvoiceRow[] {
        return q.salesInvoices;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_BANK_BY_ID;
    }

    getDetailSafeEntity(): SalesInvoiceDetail {
        return { currency: {} } as any;
    }

    protected getListGql(): DocumentNode {
        return BANKS;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_BANK;
    }
}

export const salesInvoiceService: SalesInvoiceService = new SalesInvoiceService();
