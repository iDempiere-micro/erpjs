<script lang="ts">
    import Select from 'svelte-select';
    import type {
        OrganizationDetailPartsFragment,
        SaveOrganizationMutation,
        SaveOrganizationMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import { SAVE_ORGANIZATION } from '../../lib/queries/organization';
    import {
        accountingSchemesStore,
        ensureAccountingSchemesStore,
        mapAccountingSchemes,
    } from '../../lib/accountingScheme';
    import type { OnSelectParam, SelectItem } from '../../lib/select';
    import { mapBanks, ensureBanksStore, banksStore } from '../../lib/bank';
    import { ensureCountriesStore, countriesStore, mapCountries } from '../../lib/country';
    import { throwOnUndefined } from '../../lib/util';
    import { _ } from 'svelte-i18n';

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

    ensureAccountingSchemesStore();
    let selectedAccountingScheme: SelectItem | undefined;

    const handleSelectAccountingScheme = (event: OnSelectParam) => {
        accountingSchemeId = +event.detail.value;
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

    ensureBanksStore();
    let selectedBank: SelectItem | undefined;

    const handleSelectBank = (event: OnSelectParam) => {
        bankId = +event.detail.value;
        myForm.validate();
    };

    const myForm = form(
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
        console.log({
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
        });

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
            console.log('*** organization created', data?.saveOrganization?.id);
        }
    };
</script>

<div class="mt-10 sm:mt-0">
    <div class="md:gap-6">
        <div class="mt-5 md:mt-0">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <SimpleTextBox
                        form={myForm}
                        title="Display name"
                        bind:value={displayName}
                        id="displayName"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Contact"
                        bind:value={contact}
                        id="contact"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Legal name"
                        bind:value={legalName}
                        id="legalName"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Registration"
                        bind:value={registration}
                        id="registration"
                    />
                    <SimpleTextBox
                        form={myForm}
                        title="ID Number"
                        bind:value={idNumber}
                        id="idNumber"
                    />
                    <SimpleTextBox
                        form={myForm}
                        title="VAT Number"
                        bind:value={vatNumber}
                        id="vatNumber"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Current Invoice Document Number"
                        bind:value={currentInvoiceDocumentNumber}
                        id="currentInvoiceDocumentNumber"
                    />

                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-4">
                            <label
                                for="accountingSchemes"
                                class="block text-sm font-medium text-gray-700"
                                >Accounting Schemes</label
                            >
                            {#if $myForm.fields.accountingSchemeId.errors.includes('required')}
                                <label
                                    for="accountingSchemes"
                                    class="block text-sm font-small text-red-700">Required</label
                                >
                            {/if}
                            <Select
                                inputAttributes={{ id: 'accountingSchemes' }}
                                items={mapAccountingSchemes(
                                    $accountingSchemesStore?.accountingSchemes,
                                )}
                                selectedValue={selectedAccountingScheme}
                                on:select={handleSelectAccountingScheme}
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-4">
                            <label for="banks" class="block text-sm font-medium text-gray-700"
                                >Banks</label
                            >
                            {#if $myForm.fields.bankId.errors.includes('required')}
                                <label for="banks" class="block text-sm font-small text-red-700"
                                    >Required</label
                                >
                            {/if}
                            <Select
                                inputAttributes={{ id: 'banks' }}
                                items={mapBanks($banksStore?.banks)}
                                selectedValue={selectedBank}
                                on:select={handleSelectBank}
                            />
                        </div>
                    </div>

                    <SimpleTextBox
                        form={myForm}
                        title="Bank Account Display Name"
                        bind:value={bankAccountDisplayName}
                        id="bankAccountDisplayName"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Bank Account Customer Printable Number"
                        bind:value={bankAccountCustomerPrintableNumber}
                        id="bankAccountCustomerPrintableNumber"
                    />

                    <SimpleTextBox form={myForm} title="IBAN" bind:value={iban} id="iban" />

                    <SimpleTextBox form={myForm} title="SWIFT" bind:value={swift} id="swift" />

                    <SimpleTextBox form={myForm} title="City" bind:value={city} id="city" />
                    <SimpleTextBox form={myForm} title="Street" bind:value={line1} id="line1" />
                    <SimpleTextBox
                        form={myForm}
                        title="Postal/ZIP Code"
                        bind:value={zipCode}
                        id="zipCode"
                    />

                    <div class="col-span-6 sm:col-span-3">
                        <label for="country" class="block text-sm font-medium text-gray-700"
                            >{$_('page.customers.add.country')}</label
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
                    </div>

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            on:click|preventDefault={() => {
                                saveOrganization();
                            }}
                            disabled={false}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
