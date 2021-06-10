<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import { _ } from 'svelte-i18n';
    import type { CurrencyRow } from '../../lib/model/currency';

    export let currencies: CurrencyRow[] | undefined;

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
