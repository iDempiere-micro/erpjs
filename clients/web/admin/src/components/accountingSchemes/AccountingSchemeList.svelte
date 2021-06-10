<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import { _ } from 'svelte-i18n';
    import type { AccountingSchemeRow } from '../../lib/model/accountingScheme';

    /**
     * Array of the accounting schemes to display
     */
    export let accountingSchemes: AccountingSchemeRow[] | undefined;

    const columns = [
        {
            name: $_('page.accountingSchemes.list.column1.title'),
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'accountingScheme/',
        },
        {
            name: $_('actions.detail'),
            url: 'accountingScheme-detail/',
        },
    ];
</script>

<DataGrid rows={accountingSchemes} {columns} {rowActions} />
