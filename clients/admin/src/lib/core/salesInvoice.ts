import type {
    ConfirmSalesInvoiceMutation,
    ConfirmSalesInvoiceMutationVariables,
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
import { mutation } from '../../absorb/svelte-apollo';
import { BaseEntityService, initDetail, invalidate } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';
import type { SalesInvoiceDetail, SalesInvoiceRow } from '../model/salesInvoice';
import { SALES_INVOICES } from '../queries/salesInvoices';

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
    async confirm(id: number) {
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

        const result = await confirmSalesInvoice({
            variables: {
                id,
            },
            refetchQueries,
        });
        if (result.errors) invalidate(this.stores.list);
        initDetail(this.stores.detail);
    }

    async downloadInvoice(baseUrl: string | undefined, token: string | undefined, id: number) {
        if (!baseUrl) throw new Error('baseUrl must be specified');
        const json = await (
            await fetch(baseUrl + '/../file/sales-invoice/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        ).json();
        const a = document.createElement('a');
        a.href = `data:application/pdf;base64,${json.data}`;
        a.setAttribute('download', id + '.pdf');
        a.click();
    }
}

export const salesInvoiceService: SalesInvoiceService = new SalesInvoiceService();
