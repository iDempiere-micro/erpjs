import type {
    ConfirmSalesInvoiceMutation,
    PublishSalesInvoiceMutation,
    PublishSalesInvoiceMutationVariables,
    SalesInvoiceByIdQuery,
    SalesInvoicesQuery,
    SaveSalesInvoiceMutation,
    SaveSalesInvoiceMutationVariables,
} from '../../generated/graphql';
import {
    CONFIRM_SALES_INVOICE,
    DUPLICATE_SALES_INVOICE,
    GET_SALES_INVOICE_BY_ID,
    PUBLISH_SALES_INVOICE,
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

    async makeSimpleCall<Q>(
        id: number | string,
        query: DocumentNode,
    ): Promise<number | string | undefined> {
        const refetchQueries = [
            {
                query: this.getListGql(),
            },
            {
                query: this.getDetailByIdGql(),
                variables: { id },
            },
        ];
        const confirmSalesInvoice = mutation<Q>(query);

        const result = await confirmSalesInvoice({
            variables: {
                id,
            },
            refetchQueries,
        });
        if (result.errors) invalidate(this.stores.list);
        initDetail(this.stores.detail);
        return (result?.data || ({} as any)).id;
    }

    /**
     * Confirms the item, invalidates `stores.list`
     * @params id - the invoice id
     */
    async confirm(id: number) {
        return this.makeSimpleCall<ConfirmSalesInvoiceMutation>(id, CONFIRM_SALES_INVOICE);
    }

    /**
     * Duplicates the item, invalidates `stores.list`
     * @params id - the invoice id
     */
    async duplicate(id: number) {
        return this.makeSimpleCall<ConfirmSalesInvoiceMutation>(id, DUPLICATE_SALES_INVOICE);
    }

    /**
     * Duplicates the item, invalidates `stores.list`
     * @params id - the invoice id
     */
    async publish(id: number, attachmentIds: string[]) {
        const publishSalesInvoice = mutation<
            PublishSalesInvoiceMutation,
            PublishSalesInvoiceMutationVariables
        >(PUBLISH_SALES_INVOICE);
        await publishSalesInvoice({
            variables: {
                id,
                attachmentIds,
            },
        });
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
