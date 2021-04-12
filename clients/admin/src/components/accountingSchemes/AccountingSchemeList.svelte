<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { AccountingSchemeListPartsFragment } from '../../generated/graphql';

    export let accountingSchemes: AccountingSchemeListPartsFragment[] | undefined;

    const columns = [
        {
            name: 'Bla',
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: 'edit',
            url: 'accountingScheme/',
        },
        {
            name: 'detail',
            url: 'accountingScheme-detail/',
        },
    ];
</script>

<DataGrid rows={accountingSchemes} {columns} {rowActions} />
