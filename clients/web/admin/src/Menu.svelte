<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { menuStore } from './lib/core';
    import type { MenuQuery } from './generated/graphql';
    import { GET_MENU } from './lib/queries/menu';
    import { MessageBus } from '@podium/browser';
    import type {ReadableQuery} from "@eolerp/common";
    import {apollo, getClient, query, setClient} from "@eolerp/common";

    export let segment: string;
    export let mobile: boolean | null;

    let menuResult: ReadableQuery<MenuQuery>;
    setTimeout(() => {
        if ((process.env.MOCK || (window as any).token) && !menuResult) {
            try {
                getClient();
                menuResult = query<MenuQuery>(GET_MENU);
            } catch {
            }

        }
    }, 1000);
    $: {
        if (menuResult && $menuResult.data) {
            const menu = $menuResult?.data?.menu[0];
            $menuStore = $menuResult?.data?.menu[0];
            if (menu) {
                const menuItems = menu.items.map((x) => ({
                    href: `#/${x.to}`,
                    text: $_(x.displayName),
                }));

                const messageBus = new MessageBus();
                messageBus.publish('menu', 'newMenu', menuItems);
            }
        }
    }
</script>
