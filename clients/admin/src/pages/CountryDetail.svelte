<script lang="ts">
    import { apollo, setClient } from '../lib/support/apollo';
    import { getCountryBy } from '../lib/core/country';
    import { segments, urls } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.countries.detail + id);
    setClient(client);

    const country = getCountryBy(id);
</script>

<Page
    segment={segments.countries}
    name="page.country.detail"
    title={$_('page.countries.detail.title')}
>
    <span slot="content">
        {#if $country.loading}
            {$_('status.loading')}
        {:else if $country.error}
            {$_('status.error')} {getError($country.error)}
        {:else if $country?.data?.country}
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.countries.detail.info')}
                    </h3>
                </div>
                <div class="border-t border-gray-200">
                    <dl>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.countries.detail.displayName')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {$country?.data?.country?.displayName}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.countries.detail.isoCode')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {$country?.data?.country?.isoCode}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
