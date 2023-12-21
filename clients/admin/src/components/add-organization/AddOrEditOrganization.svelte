<script lang="ts">
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form as svelteForm } from '../../absorb/svelte-forms/src';
    import { bankService, organizationService } from '../../lib/core';
    import { _ } from 'svelte-i18n';
    import Break from '../../molecules/form/Break.svelte';
    import AccountingSchemeSelect from '../accountingSchemes/AccountingSchemeSelect.svelte';
    import { push, urls } from '../../pages/pathAndSegment';
    import BankSelect from '../banks/BankSelect.svelte';
    import CountrySelect from '../countries/CountrySelect.svelte';
    import Button from '../../dsl/Button.svelte';
    import type { OrganizationDetail } from '../../lib/model/organization';
    import type { Opt } from '../../lib/support/types';

    export let organization: OrganizationDetail | undefined;
    let {
        id,
        displayName,
        contact,
        legalName,
        registration,
        idNumber,
        vatNumber,
        accountingScheme,
        documentNumberSequences,
        bankAccount,
        legalAddress,
    } = organization || {};

    let accountingSchemeId = (accountingScheme || {}).id;
    let currentInvoiceDocumentNumber = (documentNumberSequences || {}).current;

    let { bankAccountCustomerPrintableNumber, bank } = bankAccount || {};
    let bankId = (bank || {}).id;
    let bankAccountDisplayName = (bankAccount || {}).displayName;
    let { iban, swift } = bankAccount || {};
    let { city, line1, zipCode, country } = legalAddress || {};
    let countryId = (country || {}).id;

    const handleSelectAccountingScheme = (id: Opt<number>) => {
        accountingSchemeId = id;
        myForm.validate();
    };

    const handleSelectLegalAddressCountry = (id: Opt<number>) => {
        countryId = id;
        myForm.validate();
    };

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
            countryId: {
                value: countryId,
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
            countryId &&
            line1 &&
            zipCode
        ) {
            currentInvoiceDocumentNumber = +currentInvoiceDocumentNumber;
            const { data } = await organizationService.save({
                id,
                displayName,
                contact,
                legalName,
                registration,
                idNumber,
                vatNumber,
                accountingSchemeId,
                currentInvoiceDocumentNumber,
                newBankAccount: {
                    id: (bankAccount || {}).id,
                    bankAccountCustomerPrintableNumber,
                    bankId,
                    displayName: bankAccountDisplayName,
                    iban,
                    swift,
                },
                legalAddress: {
                    city,
                    countryId,
                    line1,
                    zipCode,
                },
            });
            if (data && data.saveOrganization)
                await push(urls.organizations.detail, data.saveOrganization.id);
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
                                <CountrySelect
                                    onSelect={handleSelectLegalAddressCountry}
                                    id="countryId"
                                    label={$_('page.organizations.add.country')}
                                    {countryId}
                                    form={myForm}
                                />
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
                                    form={myForm}
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
                                    form={myForm}
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
                            <Button
                                on:click={saveOrganization}
                                disabled={false && !$myForm.valid}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
