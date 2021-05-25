<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import List from './List.svelte';
    import { ClassBuilder, noop } from './classes';
    import { hideListAction } from '../absorb/smelte/src/utils/hide-list-action';
    import type { Form } from '../absorb/svelte-forms/src/types';
    import TextField from './TextField.svelte';
    import type { IdType, ListItemOnChangeType } from './types';
    import { getListItemId, isSelected, onBlurValidate } from './validation';
    import { _ } from 'svelte-i18n';
    import type { OnSelectedIdType } from './types';
    import type { ErrorType } from './types';
    import type { ListItemType } from './types';

    const optionsClassesDefault =
        'absolute left-0 bg-white rounded shadow w-full z-20 dark:bg-dark-500';
    const classesDefault = 'cursor-pointer relative pb-4';

    export let id: string;
    export let items: ListItemType[] = [];
    export let value: IdType = '';
    export const text = '';
    export let label = '';
    let selectedLabelProp: string | undefined = undefined;
    export { selectedLabelProp as selectedLabel };
    export let color = 'primary';
    export let outlined = false;
    export let placeholder = '';
    export let hint = '';
    export let error: ErrorType = false;
    export let append = 'arrow_drop_down';
    export let dense = false;
    export let persistentHint = false;
    export let autocomplete = false;
    export let noUnderline = false;
    export let showList = false;
    export let classes = classesDefault;
    export let optionsClasses = optionsClassesDefault;

    export let inputWrapperClasses = noop;
    export let appendClasses = noop;
    export let labelClasses = noop;
    export let inputClasses = noop;
    export let prependClasses = noop;
    export let listClasses = noop;
    export let selectedClasses = noop;
    export let itemClasses = noop;

    export let add = '';
    export let remove = '';
    export let replace = '';

    export let form: Form | undefined = undefined;
    export let onSelected: (itemId: OnSelectedIdType) => void = () => {};

    let itemsProcessed: ListItemType[] = [];

    function process(it: any[]) {
        return it.map((i: any) => (typeof i !== 'object' ? { value: i, text: i } : i));
    }

    $: itemsProcessed = process(items);

    let selectedLabel = '';
    $: {
        if (selectedLabelProp !== undefined) {
            selectedLabel = selectedLabelProp;
        } else if (value !== undefined) {
            let selectedItem = itemsProcessed.find((i) => isSelected(value, i));
            selectedLabel = selectedItem ? selectedItem.text || '' : '';
        } else {
            selectedLabel = '';
        }
    }

    let filterText: string | null = null;
    $: filteredItems = itemsProcessed.filter(
        (i) => !filterText || (i.text || '').toLowerCase().includes(filterText),
    );

    function filterItems({ target }: any) {
        filterText = target.value.toLowerCase();
    }

    function handleInputClick() {
        if (autocomplete) {
            showList = true;
        } else {
            showList = !showList;
        }
    }

    const onHideListPanel = () => (showList = false);

    const cb = new ClassBuilder(classes, classesDefault);
    $: c = cb.flush().add(classes, true, classesDefault).add($$props.class).get();

    const ocb = new ClassBuilder(optionsClasses, optionsClassesDefault);
    $: o = ocb
        .flush()
        .add(optionsClasses, true, optionsClassesDefault)
        .add('rounded-t-none', !outlined)
        .get();

    $: if (dense) {
        appendClasses = (i) => i.replace('pt-4', 'pt-3');
    }
    const onBlur = () => {
        error = onBlurValidate(form, id, $_);
    };

    const dispatch = createEventDispatcher();
    const onChange = ({ detail }: { detail: ListItemOnChangeType }) => {
        if (onSelected) {
            onSelected(detail.id);
        }
        dispatch('change', detail);
        onBlur();
    };
</script>

<div class={c} use:hideListAction={onHideListPanel}>
    <slot name="select">
        <TextField
            select
            {dense}
            focused={showList}
            {autocomplete}
            value={selectedLabel}
            {outlined}
            {label}
            {placeholder}
            {hint}
            {error}
            {append}
            {persistentHint}
            {color}
            {add}
            {remove}
            {replace}
            {noUnderline}
            class={inputWrapperClasses}
            {appendClasses}
            {labelClasses}
            {inputClasses}
            {prependClasses}
            {form}
            {id}
            on:click={handleInputClick}
            on:click-append={(e) => (showList = !showList)}
            on:click
            on:input={filterItems}
            appendReverse={showList}
            on:blur={onBlur}
        />
    </slot>

    {#if showList}
        <slot name="options">
            <div class={o} on:click={() => (showList = false)}>
                <List
                    bind:value
                    class={listClasses}
                    {selectedClasses}
                    {itemClasses}
                    select
                    {dense}
                    items={filteredItems}
                    on:change={onChange}
                />
            </div>
        </slot>
    {/if}
</div>
