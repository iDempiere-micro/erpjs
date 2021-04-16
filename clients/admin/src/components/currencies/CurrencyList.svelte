<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { CurrencyListPartsFragment } from '../../generated/graphql';
    import { _ } from 'svelte-i18n';

    export let currencies: CurrencyListPartsFragment[] | undefined;

    const columns = [
        {
            name: $_('page.currencies.list.column1.title'),
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'currency/',
        },
        {
            name: $_('actions.detail'),
            url: 'currency-detail/',
        },
    ];
</script>

<DataGrid rows={currencies} {columns} {rowActions} />
