<script lang="ts">
    import type { SalesInvoice } from '../../generated/graphql';
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';

    export let salesInvoices: SalesInvoice[] | undefined;

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
