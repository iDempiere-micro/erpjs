<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { menuStore } from './lib/core';
    import type { ReadableQuery } from './absorb/svelte-apollo';
    import { getClient, query } from './absorb/svelte-apollo';
    import type { MenuQuery } from './generated/graphql';
    import { GET_MENU } from './lib/queries/menu';
    import { apollo, setClient } from './lib/support/apollo';

    export let segment: string;
    export let mobile: boolean | null;

    let menuResult: ReadableQuery<MenuQuery>;
    setTimeout(() => {
        if ((process.env.MOCK || (window as any).token) && !menuResult) {
            try {
                getClient();
            } catch {
                setClient(apollo());
            }

            menuResult = query<MenuQuery>(GET_MENU);
        }
    }, 1000);
    $: {
        if (menuResult && $menuResult.data) {
            $menuStore = $menuResult?.data?.menu[0];
        }
    }
</script>

<div class="ml-10 flex items-baseline space-x-4">
    {#if $menuStore}
        {#each ($menuStore || { items: [] }).items as menuItem}
            <a
                href={`#/${menuItem.to}`}
                data-testid={`menu-${menuItem.id}-${mobile ? 'mobile' : 'desktop'}`}
                class={mobile
                    ? segment === menuItem.to
                        ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                    : segment === menuItem.to
                    ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
                >{$_(menuItem.displayName)}</a
            >
        {/each}
    {:else}
        Loading menu...
    {/if}
</div>
