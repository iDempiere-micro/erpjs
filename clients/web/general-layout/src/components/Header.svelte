<script lang="ts">
    import {getContext} from 'svelte';
    import {
        Header,
        HeaderAction,
        HeaderPanelDivider,
        HeaderPanelLink,
        HeaderPanelLinks,
        HeaderUtilities,
        SideNav,
        SideNavItems,
        SideNavLink,
        SideNavMenu,
        SideNavMenuItem,
        SkipToContent,
    } from 'carbon-components-svelte';
    import {MessageBus} from '@podium/browser';
    import {writable} from "svelte/store";
    import type {MenuItem} from "../types";

    let isOpen = false;

    let isSideNavOpen = false;

    const ctx: { dark: any; light: any; updateVar: any } = getContext('Theme');

    $: if (ctx) {
        ctx.dark.subscribe((value) => {
            console.log('dark mode?', value);
        });
        ctx.light.subscribe((value) => {
            console.log('light mode?', value);
        });
        ctx.updateVar('--cds-productive-heading-06-font-size', '4rem');
    }

    const messageBus = new MessageBus();
    messageBus.subscribe('features', 'newFeatures', event => {
        features.set(event.payload as any[]);
    });
    const features = writable([]);

    messageBus.subscribe('menu', 'newMenu', event => {
        console.log('*** got menu', event.payload);
        menu.set(event.payload as any[]);
    });
    const menu = writable<MenuItem[]>([]);
</script>

<Header company="IBM" platformName="Carbon Svelte" bind:isSideNavOpen>
    <div slot="skip-to-content">
        <SkipToContent />
    </div>
    <HeaderUtilities>
        <HeaderAction bind:isOpen>
            <HeaderPanelLinks>
                <HeaderPanelDivider>Features</HeaderPanelDivider>
                {#each $features as feature}
                    <HeaderPanelLink href={feature.uriSegment}>{feature.name}</HeaderPanelLink>
                {/each}
            </HeaderPanelLinks>
        </HeaderAction>
    </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        {#each $menu as menuItem}
            <SideNavLink text={menuItem.text} href={'#'+menuItem.href}>
                {#if menuItem.children}
                    <SideNavMenuItem href="/" text="Link 1" />
                    <SideNavMenuItem href="/" text="Link 2" />
                    <SideNavMenuItem href="/" text="Link 3" />
                {/if}
            </SideNavLink>
        {/each}
    </SideNavItems>
</SideNav>
