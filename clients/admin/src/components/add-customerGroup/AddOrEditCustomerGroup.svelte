<script lang="ts">
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from '../../absorb/svelte-forms/src';
    import type { SelectItem } from '../../lib/support/select';
    import { _ } from 'svelte-i18n';
    import Button from '../../dsl/Button.svelte';
    import { push, urls } from '../../pages/pathAndSegment';
    import type { CustomerGroupDetail } from '../../lib/model/customerGroup';
    import { customerGroupService } from '../../lib/core';

    /**
     * The customer group to be edit or `undefined` if adding a new customer group
     */
    export let customerGroup: CustomerGroupDetail | undefined;
    let { id, displayName } = customerGroup || {};

    const navigateToTheDetail = () =>
        customerGroup && push(urls.customerGroups.detail, customerGroup.id);

    let selectedCurrencyValue: SelectItem | undefined;

    const myForm = form(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required'],
            },
        }),
        {
            initCheck: true,
            validateOnChange: false,
            stopAtFirstError: false,
            stopAtFirstFieldError: false,
        },
    );

    const saveCustomerGroup = async () => {
        if (displayName) {
            const { data } = await customerGroupService.save({
                id,
                displayName,
            });
            if (data && data.saveCustomerGroup)
                await push(urls.customerGroups.detail, data.saveCustomerGroup.id);
        }
    };
</script>

<form autocomplete="off">
    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        {$_('page.customerGroups.add.internalInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.customerGroups.add.description.internalInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.customerGroups.add.displayName')}
                                    bind:value={displayName}
                                    id="displayName"
                                    hideWrapper={true}
                                />
                            </div>
                            <div class="grid-cols-1">
                                <Button
                                    on:click={() => {
                                        saveCustomerGroup();
                                    }}
                                    disabled={!$myForm.valid}
                                />
                            </div>
                            {#if customerGroup}
                                <div class="grid-cols-1">
                                    <Button
                                        label={$_('actions.cancel')}
                                        primary={false}
                                        on:click={() => {
                                            navigateToTheDetail();
                                        }}
                                    />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
