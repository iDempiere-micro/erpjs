<script lang="ts">
    import TextField from '../../dsl/TextField.svelte';
    import DatePicker from '../../dsl/DatePicker.svelte';
    import type { Form } from '../../absorb/svelte-forms/src/types';
    import { onBlurValidate } from '../../dsl/validation';
    import { _ } from 'svelte-i18n';
    import type { ErrorType } from '../../dsl/types';

    export let title: string;
    export let type: string | null = null;
    export let form: Form;
    export let min: number | null = null;
    export let id: string;
    export let value: any;
    export let hideWrapper: boolean | null = null;

    let error: ErrorType = false;
    const onBlur = () => {
        error = onBlurValidate(form, id, $_);
    };
</script>

{#if hideWrapper}
    {#if !type || type === 'text'}
        <TextField
            type="text"
            {id}
            class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
            bind:value
            data-testid={id}
            label={title}
            on:blur={onBlur}
            {error}
        />
    {:else if type === 'date'}
        <DatePicker {id} bind:value data-testid={id} on:blur={onBlur} {error} />
    {:else if type === 'number'}
        <TextField
            type="number"
            {id}
            class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
            bind:value
            data-testid={id}
            label={title}
            on:blur={onBlur}
            {error}
        />
    {:else}
        <p>unknown type</p>
    {/if}
{:else}
    <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6 sm:col-span-4">
            {#if !type || type === 'text'}
                <TextField
                    type="text"
                    {id}
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                    bind:value
                    data-testid={id}
                    label={title}
                    on:blur={onBlur}
                    {error}
                />
            {:else if type === 'date'}
                <DatePicker {id} bind:value data-testid={id} on:blur={onBlur} {error} />
            {:else if type === 'number'}
                <TextField
                    type="number"
                    {id}
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                    bind:value
                    data-testid={id}
                    label={title}
                    on:blur={onBlur}
                    {error}
                />
            {:else}
                <p>unknown type</p>
            {/if}
        </div>
    </div>
{/if}
