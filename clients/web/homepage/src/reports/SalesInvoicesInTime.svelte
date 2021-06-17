<script lang="ts">
    import { StackedAreaChart } from '@carbon/charts-svelte';

    import { _ } from 'svelte-i18n';
    import { ScaleTypes } from '@carbon/charts/interfaces';
    import {query} from "../absorb/svelte-apollo";
    import type {ReadableQuery} from "../absorb/svelte-apollo";
    import type {SalesInvoicesInTimeQuery} from "../generated/graphql";
    import {QUERY} from "../lib/queries/salesInvoicesInTime";
    import {getError} from "../lib/support/util";


    const data = query<SalesInvoicesInTimeQuery>(QUERY);
</script>

{#if $data && $data.loading}
    {$_('status.loading')}
{:else if $data && $data.error}
    Error: {getError($data.error)}
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
{/if}
