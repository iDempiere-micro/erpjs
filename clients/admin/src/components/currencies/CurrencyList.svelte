<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { CurrencyListPartsFragment } from '../../generated/graphql';

    export let currencies: CurrencyListPartsFragment[] | undefined;

    const columns = [
        {
            name: 'Bla',
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: 'edit',
            url: 'currency/',
        },
        {
            name: 'detail',
            url: 'currency-detail/',
        },
    ];
</script>

<DataGrid rows={currencies} {columns} {rowActions} />
