<script lang="ts">
    import type {
        FactoringContractDetailPartsFragment,
        SaveFactoringContractMutation,
        SaveFactoringContractMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import { SAVE_FACTORING_CONTRACT } from '../../lib/queries/factoringContract';
    import { _ } from 'svelte-i18n';
    import Button from '../../dsl/Button.svelte';
    import { push, urls } from '../../pages/pathAndSegment';
    import FactoringProviderSelect from '../factoringProviders/FactoringProviderSelect.svelte';
    import OrganizationSelect from '../organizations/OrganizationSelect.svelte';
    import CustomerSelect from '../customers/CustomerSelect.svelte';

    /**
     * The accounting scheme to be edit or `undefined` if adding a new accounting scheme
     */
    export let factoringContract: FactoringContractDetailPartsFragment | undefined;
    let factoringProviderId = factoringContract?.factoringProvider?.id;
    let customerId = factoringContract?.customer?.id;
    let organizationId = factoringContract?.organization?.id;
    let invoicePrintNote = factoringContract?.invoicePrintNote;

    const navigateToTheDetail = () =>
        factoringContract && push(urls.factoringContracts.detail, factoringContract.id);

    /*    $: {
        selectedCurrencyValue = undefined;
        if (currencyIsoCode) {
            const found = $currenciesStore.currencies.find((x) => x?.isoCode === currencyIsoCode);
            if (found) {
                selectedCurrencyValue = mapCurrencies([found])[0];
            }
        }
    } */

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

    export const saveFactoringContractMutation = mutation<
        SaveFactoringContractMutation,
        SaveFactoringContractMutationVariables
    >(SAVE_FACTORING_CONTRACT);

    const handleSelectFactoringProvider = (id: number) => {
        factoringProviderId = id;
        myForm.validate();
    };
    const handleSelectCustomer = (id: number) => {
        customerId = id;
        myForm.validate();
    };
    const handleSelectOrganization = (id: number) => {
        organizationId = id;
        myForm.validate();
    };

    const saveFactoringContract = async () => {
        if (factoringProviderId && customerId && organizationId && invoicePrintNote) {
            const { data } = await saveFactoringContractMutation({
                variables: {
                    id: factoringContract?.id,
                    factoringProviderId,
                    customerId,
                    organizationId,
                    invoicePrintNote,
                },
            });
            await push(urls.factoringContracts.detail, data?.saveFactoringContract?.id);
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
                                    form={$myForm}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-4">
                                <OrganizationSelect
                                    onSelect={handleSelectOrganization}
                                    id="organizationId"
                                    label={$_('page.factoringContracts.add.organization')}
                                    {organizationId}
                                    form={$myForm}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-4">
                                <CustomerSelect
                                    onSelect={handleSelectCustomer}
                                    id="customerId"
                                    label={$_('page.factoringContracts.add.customer')}
                                    {customerId}
                                    form={$myForm}
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
