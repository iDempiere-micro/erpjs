<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import SecondColumn from './SecondColumn.svelte';
    import type { FactoringContractListPartsFragment } from '../../generated/graphql';
    import { _ } from 'svelte-i18n';

    /**
     * Array of the accounting schemes to display
     */
    export let factoringContracts: FactoringContractListPartsFragment[] | undefined;

    const columns = [
        {
            name: $_('page.factoringContracts.list.column1.title'),
            cellComponent: FirstColumn,
        },
        {
            name: $_('page.factoringContracts.list.column2.title'),
            cellComponent: SecondColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'factoringContract/',
        },
        {
            name: $_('actions.detail'),
            url: 'factoringContract-detail/',
        },
    ];
</script>

<DataGrid rows={factoringContracts} {columns} {rowActions} />
