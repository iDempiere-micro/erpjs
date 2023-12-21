<script lang="ts">
    import { ClassBuilder } from './classes';
    import { createEventDispatcher } from 'svelte';
    import createRipple from './ripple';
    import type { CssClassesType, OnSelectedIdType } from './types';
    import Icon from './Icon.svelte';
    import type { Opt } from '../lib/support/types';

    const classesDefault =
        'focus:bg-gray-50 dark-focus:bg-gray-700 hover:bg-gray-transDark relative overflow-hidden duration-100 p-4 cursor-pointer text-gray-700 dark:text-gray-100 flex items-center z-10';
    const selectedClassesDefault = 'bg-gray-200 dark:bg-primary-transLight';
    const subheadingClassesDefault = 'text-gray-600 p-0 text-sm';
    const disabledClassesDefault = 'text-gray-600';

    export let icon = '';
    export let id = '';
    export let value: OnSelectedIdType = '';
    export let text = '';
    export let subheading = '';
    export let disabled = false;
    export let dense = false;
    export let selected = false;
    export let tabindex: Opt<number> = undefined;
    export let selectedClasses: CssClassesType = selectedClassesDefault;
    export let subheadingClasses: string = subheadingClassesDefault;
    export let disabledClasses: CssClassesType = disabledClassesDefault;

    export let to = '';
    export const item = null;
    export const level = null;

    const ripple = createRipple();
    const dispatch = createEventDispatcher();

    function change() {
        if (disabled) return;
        value = id;
        dispatch('change', { id, to });
    }

    export let classes = classesDefault;
    const cb = new ClassBuilder(classes, classesDefault);

    $: c = cb
        .flush()
        .add(selectedClasses, selected, selectedClassesDefault)
        .add('py-2', dense)
        .add(disabledClasses, disabled)
        .add($$props.class)
        .get();
</script>

<li use:ripple class={c} {tabindex} on:keypress={change} on:click={change} on:click>
    {#if icon}
        <Icon class="pr-6" small={dense}>
            {icon}
        </Icon>
    {/if}

    <div class="flex flex-col p-0">
        <div class={$$props.class}>
            <slot>{text}</slot>
        </div>
        {#if subheading}
            <div class={subheadingClasses}>{subheading}</div>
        {/if}
    </div>
</li>
