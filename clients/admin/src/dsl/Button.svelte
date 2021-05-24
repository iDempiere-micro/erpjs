<script lang="ts">
    import Icon from './Icon.svelte';
    import utils, { ClassBuilder, filterProps, noop } from './classes';
    import createRipple from './ripple';
    import { _ } from 'svelte-i18n';
    import { createEventDispatcher } from 'svelte';
    import type { CssClassesType } from './types';

    export let label = $_('actions.save');
    export let value = false;
    export let outlined = false;
    export let text = false;
    export let block = false;
    export let disabled: boolean = false;
    export let icon: string | null = null;
    export let small = false;
    export let light = false;
    export let dark = false;
    export let flat = false;
    export let iconClass = '';
    export let color = 'primary';
    export let href: string | null = null;
    export let fab = false;
    export let type = 'button';

    export let remove = '';
    export let add = '';
    export let replace = {};

    const classesDefault = 'z-10 py-2 px-4 uppercase text-sm font-medium relative overflow-hidden';
    const basicDefault = 'text-white duration-200 ease-in';

    const outlinedDefault = 'bg-transparent border border-solid';
    const textDefault = 'bg-transparent border-none px-4 hover:bg-transparent';
    const iconDefault = 'p-4 flex items-center select-none';
    const fabDefault = 'hover:bg-transparent';
    const smallDefault = 'pt-1 pb-1 pl-2 pr-2 text-xs';
    const disabledDefault =
        'bg-gray-300 text-gray-500 dark:bg-dark-400 pointer-events-none hover:bg-gray-300 cursor-default';
    const elevationDefault = 'hover:shadow shadow';

    export let classes: string = classesDefault;
    export let basicClasses: CssClassesType = basicDefault;
    export let outlinedClasses: CssClassesType = outlinedDefault;
    export let textClasses: CssClassesType = textDefault;
    export let iconClasses: CssClassesType = iconDefault;
    export let fabClasses: CssClassesType = fabDefault;
    export let smallClasses: CssClassesType = smallDefault;
    export let disabledClasses: CssClassesType = disabledDefault;
    export let elevationClasses: CssClassesType = elevationDefault;

    /**
     * Is the button the primary form button?
     */
    export let primary: boolean = true;
    /**
     * The data-testid attribute
     */
    export let dataTestId: string | undefined = primary ? 'saveButton' : 'random';

    fab = fab || (text && icon !== null);
    const basic = !outlined && !text && !fab;
    let elev = (basic || icon) && !disabled && !flat && !text;
    const elevation: boolean | undefined = elev === null || elev === '' ? undefined : elev;

    let Classes: CssClassesType = noop;
    let iClasses: CssClassesType = noop;
    let shade = 0;

    $: {
        shade = light ? 200 : 0;
        shade = dark ? -400 : shade;
    }
    $: normal = 500 - shade;
    $: lighter = 400 - shade;

    const { bg, border, txt } = utils(color);

    const cb = new ClassBuilder(classes, classesDefault);
    let iconCb: ClassBuilder | undefined;

    if (icon) {
        iconCb = new ClassBuilder(iconClass);
    }

    $: classes = cb
        .flush()
        .add(basicClasses, basic, basicDefault)
        .add(`${bg(normal)} hover:${bg(lighter)}`, basic)
        .add(elevationClasses, elevation, elevationDefault)
        .add(outlinedClasses, outlined, outlinedDefault)
        .add(
            `${border(lighter)} ${txt(normal)} hover:${bg('trans')} dark-hover:${bg('transDark')}`,
            outlined,
        )
        .add(`${txt(lighter)}`, text)
        .add(textClasses, text, textDefault)
        .add(iconClasses, icon !== null, iconDefault)
        .remove('py-2', icon !== null)
        .remove(txt(lighter), fab)
        .add(disabledClasses, disabled, disabledDefault)
        .add(smallClasses, small, smallDefault)
        .add('flex items-center justify-center h-8 w-8', small && icon !== null)
        .add('border-solid', outlined)
        .add('rounded-full', icon !== null)
        .add('w-full', block)
        .add('rounded', basic || outlined || text)
        .add('button', icon === null)
        .add(fabClasses, fab, fabDefault)
        .add(`hover:${bg('transLight')}`, fab)
        .add($$props.class)
        .remove(remove)
        .replace(replace)
        .add(add)
        .get();

    $: if (iconCb) {
        iClasses = iconCb
            .flush()
            .add(txt(), fab && !iconClass)
            .get();
    }

    const ripple = createRipple<HTMLButtonElement>(text || fab || outlined ? color : 'white');

    const props = filterProps(
        [
            'outlined',
            'text',
            'color',
            'block',
            'disabled',
            'icon',
            'small',
            'light',
            'dark',
            'flat',
            'add',
            'remove',
            'replace',
        ],
        $$props,
    );
</script>

{#if href}
    <a {href} {...props}>
        <button
            use:ripple
            class={classes}
            {...props}
            {type}
            {disabled}
            on:click
            on:mouseover
            data-testid={dataTestId}
        >
            {#if icon}
                <Icon class={iClasses} {small}>{icon}</Icon>
            {/if}
            {label}
        </button>
    </a>
{:else}
    <button
        use:ripple
        class={classes}
        {...props}
        {type}
        {disabled}
        on:click
        on:mouseover
        data-testid={dataTestId}
    >
        {#if icon}
            <Icon class={iClasses} {small}>{icon}</Icon>
        {/if}
        {label}
    </button>
{/if}
