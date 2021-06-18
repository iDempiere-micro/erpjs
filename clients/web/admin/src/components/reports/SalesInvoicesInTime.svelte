<script lang="ts">
    import { StackedAreaChart } from '@carbon/charts-svelte';
    import { getError } from '@eolerp/common';
    import type { SalesInvoicesInTimeQuery } from '../../generated/graphql';
    import { QUERY } from '../../lib/queries/salesInvoicesInTime';
    import { _ } from 'svelte-i18n';
    import { ScaleTypes } from '@carbon/charts/interfaces';
    import type { ReadableQuery } from '@eolerp/common';
    import { query } from '@eolerp/common';

    let data: ReadableQuery<SalesInvoicesInTimeQuery>;
    setTimeout(() => {
        if (!process.env.MOCK && (window as any).token && !data) {
            data = query<SalesInvoicesInTimeQuery>(QUERY);
        }
    }, 1000);

    const reload = () =>
        setTimeout(() => {
            if (!process.env.MOCK && !(window as any).token) location.reload();
        }, 1000);
</script>

{#if $data && $data.loading}
    {$_('status.loading')}
{:else if $data && $data.error}
    Error:
        {getError($data.error)}
{:else if $data && $data.data}
    <StackedAreaChart
        data={($data.data || {}).salesInvoicesReport}
        options={{
            title: 'Sales Invoices Amount in Time',
            axes: {
                left: {
                    stacked: true,
                    scaleType: ScaleTypes.LINEAR,
                    mapsTo: 'value',
                },
                bottom: {
                    scaleType: ScaleTypes.TIME,
                    mapsTo: 'date',
                },
            },
            curve: 'curveMonotoneX',
            height: '400px',
        }}
    />
{:else}
    {reload()}
{/if}
