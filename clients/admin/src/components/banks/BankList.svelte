<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { BankListPartsFragment } from '../../generated/graphql';
    import { _ } from 'svelte-i18n';

    export let banks: BankListPartsFragment[] | undefined;

    const columns = [
        {
            name: $_('page.banks.list.column1.title'),
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'bank/',
        },
        {
            name: $_('actions.detail'),
            url: 'bank-detail/',
        },
    ];
</script>

<DataGrid rows={banks} {columns} {rowActions} />
