<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { attachmentService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    attachmentService.loadList();
    let selectedAttachment: SelectItem | undefined;
    export let onSelect: (attachmentId: string) => void = (attachmentId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let attachmentId: string | undefined;
    const store = attachmentService.stores.list;

    const handleSelectAttachment = (event: OnSelectParam) => {
        attachmentId = event.detail.value.toString();
        onSelect(attachmentId);
    };

    $: {
        selectedAttachment = undefined;
        if (attachmentId) {
            const found = $store.data.find((x) => x?.id === attachmentId);
            if (found) {
                selectedAttachment = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapDisplayableToSelectItem($store.data)}
    selectedValue={selectedAttachment}
    on:select={handleSelectAttachment}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}
