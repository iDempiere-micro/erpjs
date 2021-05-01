<script lang="ts">
    import type {
        CustomerGroupDetailPartsFragment,
        SaveCustomerGroupMutation,
        SaveCustomerGroupMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';

    import { SAVE_CUSTOMER_GROUP } from '../../lib/queries/customerGroup';
    import type { SelectItem } from '../../lib/support/select';
    import { _ } from 'svelte-i18n';
    import Button from '../../dsl/Button.svelte';
    import { push, urls } from '../../pages/pathAndSegment';
    import { mutation } from '../../absorb/svelte-apollo';

    /**
     * The accounting scheme to be edit or `undefined` if adding a new accounting scheme
     */
    export let customerGroup: CustomerGroupDetailPartsFragment | undefined;
    let displayName = customerGroup?.displayName;

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

    export const saveCustomerGroupMutation = mutation<
        SaveCustomerGroupMutation,
        SaveCustomerGroupMutationVariables
    >(SAVE_CUSTOMER_GROUP);

    const saveCustomerGroup = async () => {
        if (displayName) {
            const { data } = await saveCustomerGroupMutation({
                variables: {
                    id: customerGroup?.id,
                    displayName,
                },
            });
            await push(urls.customerGroups.detail, data?.saveCustomerGroup?.id);
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
