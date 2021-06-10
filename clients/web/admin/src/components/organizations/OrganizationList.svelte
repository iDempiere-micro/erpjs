<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import { _ } from 'svelte-i18n';
    import type { OrganizationRow } from '../../lib/model/organization';

    export let organizations: OrganizationRow[] | undefined;

    const columns = [
        {
            name: $_('page.organizations.list.column1.title'),
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'organization/',
        },
        {
            name: $_('actions.detail'),
            url: 'organization-detail/',
        },
    ];
</script>

<DataGrid rows={organizations} {columns} {rowActions} />
