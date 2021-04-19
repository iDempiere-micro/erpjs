<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { CustomerGroupListPartsFragment } from '../../generated/graphql';
    import { _ } from 'svelte-i18n';

    /**
     * Array of the accounting schemes to display
     */
    export let customerGroups: CustomerGroupListPartsFragment[] | undefined;

    const columns = [
        {
            name: $_('page.customerGroups.list.column1.title'),
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'customerGroup/',
        },
        {
            name: $_('actions.detail'),
            url: 'customerGroup-detail/',
        },
    ];
</script>

<DataGrid rows={customerGroups} {columns} {rowActions} />
