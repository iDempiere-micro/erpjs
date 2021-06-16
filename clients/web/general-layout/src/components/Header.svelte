<script lang="ts">
    import { getContext } from 'svelte';
    import {
        Header,
        HeaderUtilities,
        HeaderAction,
        HeaderPanelLinks,
        HeaderPanelDivider,
        HeaderPanelLink,
        SideNav,
        SideNavItems,
        SideNavMenu,
        SideNavMenuItem,
        SideNavLink,
        SkipToContent,
        Content,
        Grid,
        Row,
        Column,
        TileGroup,
        RadioTile,
    } from 'carbon-components-svelte';
    import { expoIn } from 'svelte/easing';

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

    const features = (window as any).features;
</script>

<Header company="IBM" platformName="Carbon Svelte" bind:isSideNavOpen>
    <div slot="skip-to-content">
        <SkipToContent />
    </div>
    <HeaderUtilities>
        <HeaderAction bind:isOpen>
            <HeaderPanelLinks>
                <HeaderPanelDivider>Features</HeaderPanelDivider>
                {#each features as feature}
                    <HeaderPanelLink href={feature.uriSegment}>{feature.name}</HeaderPanelLink>
                {/each}
            </HeaderPanelLinks>
        </HeaderAction>
    </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <SideNavLink text="Link 1" />
        <SideNavLink text="Link 2" />
        <SideNavLink text="Link 3" />
        <SideNavMenu text="Menu">
            <SideNavMenuItem href="/" text="Link 1" />
            <SideNavMenuItem href="/" text="Link 2" />
            <SideNavMenuItem href="/" text="Link 3" />
        </SideNavMenu>
    </SideNavItems>
</SideNav>
