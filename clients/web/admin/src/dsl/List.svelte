<script lang="ts">
    import { ClassBuilder, noop } from './classes';
    import { getListItemId, isSelected } from './validation';

    import ListItem from './ListItem.svelte';
    import type { CssClassesType, ListItemType, OnSelectedIdType } from './types';

    export let items: ListItemType[] = [];
    export let value: OnSelectedIdType = '';
    export let dense = false;
    export let select = false;

    export const level = null;
    export const text = '';
    export const item = {};
    export const to = null;
    export const selectedClasses: CssClassesType = noop;
    export const itemClasses: CssClassesType = noop;
    export const disabledClasses: CssClassesType = noop;

    const classesDefault = 'py-2 rounded';

    export let classes = classesDefault;

    function getText(i: ListItemType) {
        if (i.text !== undefined) return i.text;
        if (i.value !== undefined) return i.value;
        return i;
    }

    const cb = new ClassBuilder($$props.class);

    $: c = cb.flush().add(classes, true, classesDefault).add($$props.class).get();

    console.log('*** value', value);
    console.log('*** items', item);
</script>

<ul class={c} class:rounded-t-none={select}>
    {#each items as item, i}
        {#if item.to !== undefined}
            <slot name="item" {item} {dense} {value}>
                <a tabindex={i + 1} href={item.to}>
                    <ListItem bind:value {...item} id={getListItemId(item)} {dense} on:change>
                        {item.text}
                    </ListItem>
                </a>
            </slot>
        {:else}
            <slot name="item" {item} {dense} {value}>
                <ListItem
                    bind:value
                    {selectedClasses}
                    {itemClasses}
                    {disabledClasses}
                    {...item}
                    tabindex={i + 1}
                    id={getListItemId(item)}
                    selected={isSelected(value, item)}
                    {dense}
                    on:change
                    on:click
                >
                    {getText(item)}
                </ListItem>
            </slot>
        {/if}
    {/each}
</ul>
