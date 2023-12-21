<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import { _ } from 'svelte-i18n';
    import type { SalesInvoiceRow } from '../../lib/model/salesInvoice';

    export let salesInvoices: SalesInvoiceRow[] | undefined;

    const columns = [
        {
            name: $_('page.salesInvoices.list.column1.title'),
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'sales-invoice/',
        },
        {
            name: $_('actions.detail'),
            url: 'sales-invoice-detail/',
        },
    ];
</script>

<DataGrid rows={salesInvoices} {columns} {rowActions} />
