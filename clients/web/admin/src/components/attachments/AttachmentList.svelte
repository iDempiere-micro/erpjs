<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import { _ } from 'svelte-i18n';
    import type { AttachmentRow } from '../../lib/model/attachment';

    /**
     * Array of the accounting schemes to display
     */
    export let attachments: AttachmentRow[] | undefined;

    const columns = [
        {
            name: $_('page.attachments.list.column1.title'),
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'attachment/',
        },
        {
            name: $_('actions.detail'),
            url: 'attachment-detail/',
        },
    ];
</script>

<DataGrid rows={attachments} {columns} {rowActions} />
