<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { authStore } from './lib/support/auth';
    import { menuStore } from './lib/core';
    import { apollo } from './lib/support/apollo';
    import { onDestroy } from 'svelte';
    import { GET_MENU } from './lib/queries/menu';
    import type { MenuQuery } from './generated/graphql';

    export let segment: string;
    export let mobile: boolean | null;

    const loadMenu = async (token: string | undefined) => {
        if (token && !menuStore.get()) {
            const client = apollo('/');
            $menuStore = (await client.query<MenuQuery>({ query: GET_MENU })).data.menu[0];
        }
    };

    const unsubscribe = authStore.subscribe((value) => {
        console.log('*** Menu', value);
        loadMenu(value?.token);
    });
    onDestroy(unsubscribe);
    loadMenu($authStore?.token);
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
