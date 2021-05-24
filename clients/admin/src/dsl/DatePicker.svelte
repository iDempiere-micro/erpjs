<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Picker from './Picker.svelte';
    import { noop } from './classes';
    import type { Maybe } from '../generated/graphql';
    import type { DatePickerValueType, ErrorType, TextFieldEvent } from './types';
    import { toEvent } from './validation';
    import TextField from './TextField.svelte';
    import Menu from './Menu.svelte';

    const dispatch = createEventDispatcher();

    export let label = 'Date';
    export let open = false;
    export let defaultIcon = 'date_range';
    export let value: Maybe<DatePickerValueType> = null;
    export let locale = 'default';
    export let todayClasses = 'text-primary-600 rounded-full border border-primary-600';
    export let selectedClasses = 'bg-primary-600 text-white rounded-full';
    export let closeOnSelect = true;
    export let appendClasses = noop;
    export let dense = false;
    export let id: string;
    export let error: ErrorType = false;

    let hasUserValue: boolean = Boolean(value);
    if (hasUserValue) {
        value = new Date(value!!);
    }

    const today = new Date().getDate();

    let displayValue: string =
        value && (value as Date).toLocaleDateString ? (value as Date).toLocaleDateString() : '';

    function valid(date: Date) {
        return new Date(date).toString() !== 'Invalid Date' && !isNaN(new Date(date).getDate());
    }

    function changeTextInput(event: Event) {
        const e = toEvent<TextFieldEvent>(event);
        let date;
        const dateArray = e.target.value.split(/\D+/);
        if (dateArray[2].length == 4)
            date = new Date(+dateArray[2], +dateArray[1] - 1, +dateArray[0]);
        else date = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
        if (valid(date)) value = date;

        if (e.target.value === '') {
            value = null;
        }
    }

    $: if (dense) {
        appendClasses = (i) => i.replace('pt-4', 'pt-3');
    }
</script>

<Menu bind:open>
    <div slot="activator">
        <TextField
            classes={(i) => i.replace('mb-6', '')}
            value={displayValue}
            {id}
            {label}
            {dense}
            append={defaultIcon}
            {appendClasses}
            on:click={() => (open = !open)}
            on:click-append={() => (open = !open)}
            on:change={changeTextInput}
            {error}
        />
    </div>
    <div slot="menu">
        {#if open}
            <Picker
                bind:value
                bind:open
                {dense}
                {locale}
                {todayClasses}
                {selectedClasses}
                {closeOnSelect}
                on:change
                on:change={(e) => {
                    displayValue = e.detail.toLocaleDateString();
                }}
            />
        {/if}
    </div>
</Menu>
