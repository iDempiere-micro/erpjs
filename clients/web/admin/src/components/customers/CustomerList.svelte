<script lang="ts">
    import NameColumn from './NameColumn.svelte';
    import AddressColumn from './AddressColumn.svelte';
    import ThirdColumn from './ThirdColumn.svelte';
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import type { CustomerRow } from '../../lib/model/customer';

    export let customers: CustomerRow[] | undefined;

    const columns = [
        {
            name: 'Name',
            cellComponent: NameColumn,
        },
        {
            name: 'Address',
            cellComponent: AddressColumn,
        },
        {
            name: 'VAT',
            cellComponent: ThirdColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: 'edit',
            url: 'customer/',
        },
        {
            name: 'detail',
            url: 'customer-detail/',
        },
    ];
</script>

<DataGrid rows={customers} {columns} {rowActions} />
