<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { menuStore } from './lib/core';
    import type { ReadableQuery } from './absorb/svelte-apollo';
    import { getClient, query } from './absorb/svelte-apollo';
    import type { MenuQuery } from './generated/graphql';
    import { GET_MENU } from './lib/queries/menu';
    import { apollo, setClient } from './lib/support/apollo';
    import { MessageBus } from '@podium/browser';

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
            const menu = $menuResult?.data?.menu[0];
            $menuStore = $menuResult?.data?.menu[0];
            if (menu) {
                const menuItems = menu.items.map((x)=>({ href: `#/${x.to}`, text: $_(x.displayName) }))

                const messageBus = new MessageBus();
                messageBus.publish('menu', 'newMenu', menuItems);
            }
        }
    }
</script>
