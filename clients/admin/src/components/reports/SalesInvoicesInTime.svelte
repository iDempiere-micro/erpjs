<script lang="ts">
    import { StackedAreaChart } from '@carbon/charts-svelte';

    import { getError } from '../../lib/support/util';
    import type { SalesInvoicesInTimeQuery } from '../../generated/graphql';
    import { QUERY } from '../../lib/queries/salesInvoicesInTime';
    import { _ } from 'svelte-i18n';
    import { ScaleTypes } from '@carbon/charts/interfaces';
    import type { ReadableQuery } from '../../absorb/svelte-apollo';
    import { query } from '../../absorb/svelte-apollo';

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

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/@carbon/charts/styles.min.css" />
</svelte:head>

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
