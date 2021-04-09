<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { BankListPartsFragment } from '../../generated/graphql';

    export let banks: BankListPartsFragment[] | undefined;

    const columns = [
        {
            name: 'Bla',
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: 'edit',
            url: 'bank/',
        },
        {
            name: 'detail',
            url: 'bank-detail/',
        },
    ];
</script>

<DataGrid rows={banks} {columns} {rowActions} />
