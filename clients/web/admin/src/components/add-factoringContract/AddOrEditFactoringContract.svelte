<script lang="ts">
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from '../../absorb/svelte-forms/src';
    import { _ } from 'svelte-i18n';
    import Button from '../../dsl/Button.svelte';
    import { push, urls } from '../../pages/pathAndSegment';
    import FactoringProviderSelect from '../factoringProviders/FactoringProviderSelect.svelte';
    import OrganizationSelect from '../organizations/OrganizationSelect.svelte';
    import CustomerSelect from '../customers/CustomerSelect.svelte';
    import type { FactoringContractDetail } from '../../lib/model/factoringContract';
    import { factoringContractService } from '../../lib/core';
    import type { Opt } from '../../lib/support/types';

    /**
     * The factoring contract to be edit or `undefined` if adding a new factoring contract
     */
    export let factoringContract: FactoringContractDetail | undefined;

    let factoringProviderId = ((factoringContract || {}).factoringProvider || {}).id;
    let customerId = ((factoringContract || {}).customer || {}).id;
    let organizationId = ((factoringContract || {}).organization || {}).id;
    let { id, invoicePrintNote } = factoringContract || {};

    const navigateToTheDetail = () =>
        factoringContract && push(urls.factoringContracts.detail, factoringContract.id);

    const myForm = form(
        () => ({
            factoringProviderId: {
                value: factoringProviderId,
                validators: ['required'],
            },
            customerId: {
                value: customerId,
                validators: ['required'],
            },
            organizationId: {
                value: organizationId,
                validators: ['required'],
            },
            invoicePrintNote: {
                value: invoicePrintNote,
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

    const handleSelectFactoringProvider = (id: Opt<number>) => {
        factoringProviderId = id;
        myForm.validate();
    };
    const handleSelectCustomer = (id: Opt<number>) => {
        customerId = id;
        myForm.validate();
    };
    const handleSelectOrganization = (id: Opt<number>) => {
        organizationId = id;
        myForm.validate();
    };

    const saveFactoringContract = async () => {
        if (factoringProviderId && customerId && organizationId && invoicePrintNote) {
            const { data } = await factoringContractService.save({
                id,
                factoringProviderId,
                customerId,
                organizationId,
                invoicePrintNote,
            });
            if (data && data.saveFactoringContract)
                await push(urls.factoringContracts.detail, data.saveFactoringContract.id);
        }
    };
</script>

<form autocomplete="off">
    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        {$_('page.factoringContracts.add.internalInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.factoringContracts.add.description.internalInformation')}
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
                                    title={$_('page.factoringContracts.add.invoicePrintNote')}
                                    bind:value={invoicePrintNote}
                                    id="invoicePrintNote"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-4">
                                <FactoringProviderSelect
                                    onSelect={handleSelectFactoringProvider}
                                    id="factoringProviderId"
                                    label={$_('page.factoringContracts.add.factoringProvider')}
                                    {factoringProviderId}
                                    form={myForm}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-4">
                                <OrganizationSelect
                                    onSelect={handleSelectOrganization}
                                    id="organizationId"
                                    label={$_('page.factoringContracts.add.organization')}
                                    {organizationId}
                                    form={myForm}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-4">
                                <CustomerSelect
                                    onSelect={handleSelectCustomer}
                                    id="customerId"
                                    label={$_('page.factoringContracts.add.customer')}
                                    {customerId}
                                    form={myForm}
                                />
                            </div>

                            <div class="grid-cols-1">
                                <Button
                                    on:click={() => {
                                        saveFactoringContract();
                                    }}
                                    disabled={!$myForm.valid}
                                />
                            </div>
                            {#if factoringContract}
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
