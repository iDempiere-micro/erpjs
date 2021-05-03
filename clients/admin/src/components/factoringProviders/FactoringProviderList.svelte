<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import { _ } from 'svelte-i18n';
    import type { FactoringProviderRow } from '../../lib/model/factoringProvider';

    export let factoringProviders: FactoringProviderRow[] | undefined;

    const columns = [
        {
            name: $_('page.factoringProviders.list.column1.title'),
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'factoringProvider/',
        },
        {
            name: $_('actions.detail'),
            url: 'factoringProvider-detail/',
        },
    ];
</script>

<DataGrid rows={factoringProviders} {columns} {rowActions} />
