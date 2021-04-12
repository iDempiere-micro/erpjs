<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { OrganizationListPartsFragment } from '../../generated/graphql';

    export let organizations: OrganizationListPartsFragment[] | undefined;

    const columns = [
        {
            name: 'Bla',
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: 'edit',
            url: 'organization/',
        },
        {
            name: 'detail',
            url: 'organization-detail/',
        },
    ];
</script>

<DataGrid rows={organizations} {columns} {rowActions} />
