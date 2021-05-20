<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { countryService } from '../../lib/core';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';
    import Select from '../../absorb/smelte/src/components/Select/Select.svelte';
    import type { Form } from '../../absorb/svelte-forms/src/types';

    countryService.loadList();
    export let onSelect: (countryId: number) => void = (countryId) => {};
    export let id: string;
    export let form: Form;
    export let label: string;
    export let countryId: number | undefined;
    const store = countryService.stores.list;
    let error: boolean | string = false;

    const onBlur = () => {
        try {
            form.validate();
            error = false;
            if ($form.fields[id].errors.includes('required')) {
                error = $_('validator.required');
            }
        } catch (e) {
            console.log('waaah', e);
        }
    };
    onBlur();
</script>

<Select
    bind:value={countryId}
    outlined
    autocomplete
    {error}
    {label}
    items={mapDisplayableToSelectItem($store.data)}
    on:blur={onBlur}
/>
