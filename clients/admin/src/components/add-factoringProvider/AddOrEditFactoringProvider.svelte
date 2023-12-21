<script lang="ts">
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form as svelteForm } from '../../absorb/svelte-forms/src';
    import { _ } from 'svelte-i18n';
    import Break from '../../molecules/form/Break.svelte';
    import { push, urls } from '../../pages/pathAndSegment';
    import Button from '../../dsl/Button.svelte';
    import BankSelect from '../banks/BankSelect.svelte';
    import { bankService, factoringProviderService } from '../../lib/core';
    import type { FactoringProviderDetail } from '../../lib/model/factoringProvider';
    import type { Opt } from '../../lib/support/types';

    export let factoringProvider: FactoringProviderDetail | undefined;
    let { id, displayName, contact, legalName, bankAccount } = factoringProvider || {};

    let { bankAccountCustomerPrintableNumber, bank, iban, swift } = bankAccount || {};
    let bankId = (bank || {}).id;
    let bankAccountDisplayName = (bankAccount || {}).displayName;
    let bankAccountId = (bankAccount || {}).id;

    bankService.loadList();

    const handleSelectBank = (id: Opt<number>) => {
        bankId = id;
        myForm.validate();
    };

    const myForm = svelteForm(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required'],
            },
            contact: {
                value: contact,
                validators: ['required'],
            },
            legalName: {
                value: legalName,
                validators: ['required'],
            },
            bankAccountCustomerPrintableNumber: {
                value: bankAccountCustomerPrintableNumber,
                validators: ['required'],
            },
            bankId: {
                value: bankId,
                validators: ['required'],
            },
            bankAccountDisplayName: {
                value: bankAccountDisplayName,
                validators: ['required'],
            },
            iban: {
                value: iban,
                validators: ['required'],
            },
            swift: {
                value: swift,
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

    const saveFactoringProvider = async () => {
        if (
            displayName &&
            contact &&
            legalName &&
            bankAccountCustomerPrintableNumber &&
            bankId &&
            bankAccountDisplayName &&
            iban &&
            swift
        ) {
            const { data } = await factoringProviderService.save({
                id,
                displayName,
                contact,
                legalName,
                newBankAccount: {
                    id: bankAccountId,
                    bankAccountCustomerPrintableNumber,
                    bankId,
                    displayName: bankAccountDisplayName,
                    iban,
                    swift,
                },
            });
            if (data && data.saveFactoringProvider)
                await push(urls.factoringProviders.detail, data.saveFactoringProvider.id);
        }
    };
</script>

<form autocomplete="off">
    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        {$_('page.factoringProviders.add.internalInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.factoringProviders.add.description.internalInformation')}
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
                                    title={$_('page.factoringProviders.add.displayName')}
                                    bind:value={displayName}
                                    id="displayName"
                                    hideWrapper={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Break />

    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        {$_('page.factoringProviders.add.legalInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.factoringProviders.add.description.legalInformation')}
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
                                    title={$_('page.factoringProviders.add.legalName')}
                                    bind:value={legalName}
                                    id="legalName"
                                    hideWrapper={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Break />

    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        {$_('page.factoringProviders.add.bankAccountInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.factoringProviders.add.description.bankAccountInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <BankSelect
                                    onSelect={handleSelectBank}
                                    id="bankId"
                                    label={$_('page.factoringProviders.add.bank')}
                                    {bankId}
                                    form={myForm}
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.factoringProviders.add.bankAccountDisplayName')}
                                    bind:value={bankAccountDisplayName}
                                    id="bankAccountDisplayName"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_(
                                        'page.factoringProviders.add.bankAccountCustomerPrintableNumber',
                                    )}
                                    bind:value={bankAccountCustomerPrintableNumber}
                                    id="bankAccountCustomerPrintableNumber"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.factoringProviders.add.iban')}
                                    bind:value={iban}
                                    id="iban"
                                    hideWrapper={true}
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.factoringProviders.add.swift')}
                                    bind:value={swift}
                                    id="swift"
                                    hideWrapper={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Break />

    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        {$_('page.factoringProviders.add.contactInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.factoringProviders.add.description.contactInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <SimpleTextBox
                            form={myForm}
                            title={$_('page.factoringProviders.add.contact')}
                            bind:value={contact}
                            id="contact"
                        />

                        <div class="px-4 py-3 bg-white text-right sm:px-6">
                            <Button
                                on:click={() => {
                                    saveFactoringProvider();
                                }}
                                disabled={!$myForm.valid}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
