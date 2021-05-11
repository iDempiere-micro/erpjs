import type {
    SalesInvoiceByIdQuery,
    SalesInvoicesQuery,
    SaveSalesInvoiceMutation,
    SaveSalesInvoiceMutationVariables,
} from '../../generated/graphql';
import {
    CONFIRM_SALES_INVOICE,
    GET_SALES_INVOICE_BY_ID,
    SAVE_SALES_INVOICE,
} from '../queries/salesInvoice';
import { mutation, query } from '../../absorb/svelte-apollo';
import { BaseEntityService, initDetail, invalidate } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';
import type { SalesInvoiceDetail, SalesInvoiceRow } from '../model/salesInvoice';
import type { FetchResult } from '@apollo/client';
import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';
import type {
    ConfirmSalesInvoiceMutation,
    ConfirmSalesInvoiceMutationVariables,
} from '../../generated/graphql';
import { SALES_INVOICES } from '../queries/salesInvoices';

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
        return GET_SALES_INVOICE_BY_ID;
    }

    getDetailSafeEntity(): SalesInvoiceDetail {
        return { currency: {} } as any;
    }

    protected getListGql(): DocumentNode {
        return SALES_INVOICES;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_SALES_INVOICE;
    }

    /**
     * Saves the item, invalidates `stores.list`
     * @params id - the invoice id
     */
    confirm(id: number) {
        const refetchQueries = [
            {
                query: this.getListGql(),
            },
            {
                query: this.getDetailByIdGql(),
                variables: { id },
            },
        ];
        const confirmSalesInvoice = mutation<
            ConfirmSalesInvoiceMutation,
            ConfirmSalesInvoiceMutationVariables
        >(CONFIRM_SALES_INVOICE);

        const result = confirmSalesInvoice({
            variables: {
                id,
            },
            refetchQueries,
        });
        invalidate(this.stores.list);
        initDetail(this.stores.detail);
    }
}

export const salesInvoiceService: SalesInvoiceService = new SalesInvoiceService();
