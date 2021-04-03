<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { SalesInvoiceListPartsFragment } from '../../generated/graphql';

    export let salesInvoices: SalesInvoiceListPartsFragment[] | undefined;

    const columns = [
        {
            name: 'Bla',
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: 'edit',
            url: 'sales-invoice/',
        },
        {
            name: 'detail',
            url: 'sales-invoice-detail/',
        },
    ];
</script>

<DataGrid rows={salesInvoices} {columns} {rowActions} />
