<script lang="ts">
    import { Link } from 'svelte-routing';
    import { _ } from 'svelte-i18n';
    import { authStore } from './lib/auth';
    import { menuStore } from './lib/menu';

    export let segment: string;
    let menu: any = null;
    export let mobile: boolean | null;

    import gql from 'graphql-tag';
    import { apollo } from './lib/apollo';
    import { onDestroy } from 'svelte';
    const EVERYTHING = gql`
        {
            menu {
                id
                displayName
                items {
                    id
                    to
                    displayName
                }
            }
        }
    `;

    const loadMenu = async (token: string) => {
        if (token && !$menuStore?.data) {
            const client = apollo(token, process.env.API_BASE_URL, '/');
            $menuStore = await client.query({ query: EVERYTHING });
        }
    };

    const unsubscribe = authStore.subscribe((value) => {
        loadMenu(value?.token);
    });
    onDestroy(unsubscribe);
    loadMenu($authStore?.token);
</script>

<div class="ml-10 flex items-baseline space-x-4">
    {#each $menuStore?.data?.menu[0].items || [] as menuItem}
        <Link
            to={`/${menuItem.to}`}
            class={mobile
                ? segment === menuItem.to
                    ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                : segment === menuItem.to
                ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
            >{$_(menuItem.displayName)}</Link
        >
    {/each}
</div>
