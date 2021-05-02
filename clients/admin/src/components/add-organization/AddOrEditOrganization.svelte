<script lang="ts">
    import Select from 'svelte-select';
    import type {
        OrganizationDetailPartsFragment,
        SaveOrganizationMutation,
        SaveOrganizationMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form as svelteForm } from 'svelte-forms';

    import { SAVE_ORGANIZATION } from '../../lib/queries/organization';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import {
        bankService,
        countriesStore,
        ensureCountriesStore,
        mapCountries,
    } from '../../lib/core';
    import { throwOnUndefined } from '../../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Break from '../../molecules/form/Break.svelte';
    import AccountingSchemeSelect from '../accountingSchemes/AccountingSchemeSelect.svelte';
    import { push, urls } from '../../pages/pathAndSegment';
    import { mutation } from '../../absorb/svelte-apollo';
    import BankSelect from '../banks/BankSelect.svelte';

    export let organization: OrganizationDetailPartsFragment | undefined;
    let displayName = organization?.displayName;
    let contact = organization?.contact;
    let legalName = organization?.legalName;
    let registration = organization?.registration;
    let idNumber = organization?.idNumber;
    let vatNumber = organization?.vatNumber;
    let accountingSchemeId = organization?.accountingScheme?.id;
    let currentInvoiceDocumentNumber = organization?.documentNumberSequences?.current;

    let bankAccountCustomerPrintableNumber =
        organization?.bankAccount?.bankAccountCustomerPrintableNumber;
    let bankId = organization?.bankAccount?.bank?.id;
    let bankAccountDisplayName = organization?.bankAccount?.displayName;
    let iban = organization?.bankAccount?.iban;
    let swift = organization?.bankAccount?.swift;
    let city = organization?.legalAddress?.city;
    let countryIsoCode = organization?.legalAddress?.country?.isoCode;
    let line1 = organization?.legalAddress?.line1;
    let zipCode = organization?.legalAddress?.zipCode;

    const handleSelectAccountingScheme = (id: number) => {
        accountingSchemeId = id;
        myForm.validate();
    };

    ensureCountriesStore();

    let selectedLegalAddressCountryValue: SelectItem | undefined;
    const handleSelectLegalAddressCountry = (event: OnSelectParam) => {
        const countries = countriesStore.get().countries;
        countryIsoCode =
            countries?.find((x) => x.id === event.detail.value)?.isoCode || throwOnUndefined();
        myForm.validate();
    };

    bankService.loadList();

    const handleSelectBank = (id: number) => {
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
            registration: {
                value: registration,
                validators: ['required'],
            },
            idNumber: {
                value: idNumber,
                validators: ['required'],
            },
            vatNumber: {
                value: vatNumber,
                validators: [],
            },
            accountingSchemeId: {
                value: accountingSchemeId,
                validators: ['required'],
            },
            currentInvoiceDocumentNumber: {
                value: currentInvoiceDocumentNumber,
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
            city: {
                value: city,
                validators: ['required'],
            },
            countryIsoCode: {
                value: countryIsoCode,
                validators: ['required'],
            },
            line1: {
                value: line1,
                validators: ['required'],
            },
            zipCode: {
                value: zipCode,
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

    export const saveOrganizationMutation = mutation<
        SaveOrganizationMutation,
        SaveOrganizationMutationVariables
    >(SAVE_ORGANIZATION);

    const saveOrganization = async () => {
        if (
            displayName &&
            contact &&
            legalName &&
            registration &&
            idNumber &&
            currentInvoiceDocumentNumber &&
            accountingSchemeId &&
            bankAccountCustomerPrintableNumber &&
            bankId &&
            bankAccountDisplayName &&
            iban &&
            swift &&
            city &&
            countryIsoCode &&
            line1 &&
            zipCode
        ) {
            currentInvoiceDocumentNumber = +currentInvoiceDocumentNumber;
            const { data } = await saveOrganizationMutation({
                variables: {
                    id: organization?.id,
                    displayName,
                    contact,
                    legalName,
                    registration,
                    idNumber,
                    vatNumber,
                    accountingSchemeId,
                    currentInvoiceDocumentNumber,
                    newBankAccount: {
                        id: organization?.bankAccount?.id,
                        bankAccountCustomerPrintableNumber,
                        bankId,
                        displayName: bankAccountDisplayName,
                        iban,
                        swift,
                    },
                    legalAddress: {
                        city,
                        countryIsoCode,
                        line1,
                        zipCode,
                    },
                },
            });
            await push(urls.organizations.detail, data?.saveOrganization?.id);
        }
    };
</script>

<form autocomplete="off">
    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        {$_('page.organizations.add.internalInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.organizations.add.description.internalInformation')}
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
                                    title={$_('page.organizations.add.displayName')}
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
                        {$_('page.organizations.add.legalInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.organizations.add.description.legalInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="country" class="block text-sm font-medium text-gray-700"
                                    >{$_('page.organizations.add.country')}</label
                                >
                                <Select
                                    inputAttributes={{
                                        id: 'country',
                                        autocomplete: 'disabled',
                                    }}
                                    items={mapCountries($countriesStore?.countries)}
                                    selectedValue={selectedLegalAddressCountryValue}
                                    on:select={handleSelectLegalAddressCountry}
                                />
                                {#if $myForm.fields.countryIsoCode.errors.includes('required')}
                                    <label
                                        for="country"
                                        class="block text-sm font-small text-red-700"
                                        >{$_('validator.required')}</label
                                    >
                                {/if}
                            </div>

                            <div class="col-span-6">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.legalName')}
                                    bind:value={legalName}
                                    id="legalName"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.registration')}
                                    bind:value={registration}
                                    id="registration"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.idNumber')}
                                    bind:value={idNumber}
                                    id="idNumber"
                                    hideWrapper={true}
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.vatNumber')}
                                    bind:value={vatNumber}
                                    id="vatNumber"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.line1')}
                                    bind:value={line1}
                                    id="line1"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.city')}
                                    bind:value={city}
                                    id="city"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.zipCode')}
                                    bind:value={zipCode}
                                    id="zipCode"
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
                        {$_('page.organizations.add.bankAccountInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.organizations.add.description.bankAccountInformation')}
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
                                    label={$_('page.organizations.add.bank')}
                                    {bankId}
                                    form={$myForm}
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.bankAccountDisplayName')}
                                    bind:value={bankAccountDisplayName}
                                    id="bankAccountDisplayName"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_(
                                        'page.organizations.add.bankAccountCustomerPrintableNumber',
                                    )}
                                    bind:value={bankAccountCustomerPrintableNumber}
                                    id="bankAccountCustomerPrintableNumber"
                                    hideWrapper={true}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.iban')}
                                    bind:value={iban}
                                    id="iban"
                                    hideWrapper={true}
                                />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.organizations.add.swift')}
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
                        {$_('page.organizations.add.accountingInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.organizations.add.description.accountingInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                <AccountingSchemeSelect
                                    onSelect={handleSelectAccountingScheme}
                                    id="accountingSchemeId"
                                    label={$_('page.organizations.add.accountingScheme')}
                                    {accountingSchemeId}
                                    form={$myForm}
                                />
                            </div>
                        </div>

                        <SimpleTextBox
                            form={myForm}
                            title={$_('page.organizations.add.currentInvoiceDocumentNumber')}
                            bind:value={currentInvoiceDocumentNumber}
                            id="currentInvoiceDocumentNumber"
                            type="number"
                        />
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
                        {$_('page.organizations.add.contactInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.organizations.add.description.contactInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <SimpleTextBox
                            form={myForm}
                            title={$_('page.organizations.add.contact')}
                            bind:value={contact}
                            id="contact"
                        />

                        <div class="px-4 py-3 bg-white text-right sm:px-6">
                            <button
                                type="submit"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                on:click|preventDefault={() => {
                                    saveOrganization();
                                }}
                                disabled={false}
                            >
                                {$_('page.organizations.add.save')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
