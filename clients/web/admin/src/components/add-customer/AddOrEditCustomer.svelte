<script lang="ts">
    import Break from '../../molecules/form/Break.svelte';

    import { _ } from 'svelte-i18n';
    import type { SelectItem } from '../../lib/support/select';
    import CustomerGroupSelect from '../customerGroups/CustomerGroupSelect.svelte';
    import { push, urls } from '../../pages/pathAndSegment';
    import { GET_CUSTOMERS_BY_ARGS } from '../../lib/queries/customers';
    import { getClient } from '../../absorb/svelte-apollo';
    import { countryService, customerService } from '../../lib/core';
    import CountrySelect from '../countries/CountrySelect.svelte';
    import Button from '../../dsl/Button.svelte';
    import type { CustomerDetail } from '../../lib/model/customer';
    import { form, bindClass } from '../../absorb/svelte-forms/src';
    import type { Opt } from '../../lib/support/types';

    export let customer: CustomerDetail | undefined;

    countryService.loadList();

    const removeCustomerIdIfAny = (ids: { id: number }[]): { id: number }[] =>
        !customer ? ids : ids.filter(({ id }) => id != customer!.id);
    const getCustomersByDisplayName = () =>
        getClient().query({
            query: GET_CUSTOMERS_BY_ARGS,
            variables: { displayName },
        });
    const getCustomersByLegalName = () =>
        getClient().query({
            query: GET_CUSTOMERS_BY_ARGS,
            variables: { legalName },
        });
    const validateDisplayName = async () => {
        const { data } = await getCustomersByDisplayName();

        return {
            name: 'validateDisplayName',
            valid: !removeCustomerIdIfAny(data.customersByArgs).length,
        };
    };

    const validateLegalName = async () => {
        const { data } = await getCustomersByLegalName();
        return {
            name: 'validateLegalName',
            valid: !removeCustomerIdIfAny(data.customersByArgs).length,
        };
    };
    let selectedLegalAddressCountryValue: SelectItem | undefined;

    let { displayName, legalName, idNumber, invoicingEmail, customerGroup, legalAddress } =
        customer || {};
    displayName = displayName || '';
    legalName = legalName || '';
    let note = (customer || {}).note || undefined;
    let vatNumber = (customer || {}).vatNumber || undefined;

    let customerGroupId = (customerGroup || {}).id;

    let { country } = legalAddress || {};
    let legalAddressCity = (legalAddress || {}).city;
    let legalAddressCountryId: Opt<number> = (country || {}).id;
    let legalAddressLine1 = (legalAddress || {}).line1;
    let legalAddressZipCode = (legalAddress || {}).zipCode;

    const handleSelectLegalAddressCountry = (id: Opt<number>) => {
        legalAddressCountryId = id;
        myForm.validate();
    };

    const myForm = form(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required', 'min:6', validateDisplayName],
            },
            legalName: { value: legalName, validators: ['required', 'min:6', validateLegalName] },
            legalAddressCity: { value: legalAddressCity, validators: ['required'] },

            note: { value: note, validators: [] },

            idNumber: { value: idNumber, validators: ['required'] },
            vatNumber: { value: vatNumber, validators: [] },
            legalAddressLine1: { value: legalAddressLine1, validators: ['required'] },
            legalZip: { value: legalAddressZipCode, validators: ['required'] },
            invoicingEmail: { value: invoicingEmail, validators: ['required'] },
            customerGroupId: { value: customerGroupId, validators: [] },
            legalAddressCountryId: { value: legalAddressCountryId, validators: ['required'] },
        }),
        {
            initCheck: true,
            validateOnChange: false,
            stopAtFirstError: false,
            stopAtFirstFieldError: false,
        },
    );

    let files: any;
    let dataFile = null;

    const saveCustomer = async () => {
        if (
            displayName &&
            legalName &&
            legalAddressCity &&
            idNumber &&
            legalAddressZipCode &&
            legalAddressLine1 &&
            legalAddressCountryId &&
            invoicingEmail
        ) {
            const { data } = await customerService.save({
                id: customer ? customer.id : null,
                displayName,
                legalName,
                legalAddressCity,
                note,
                idNumber,
                legalAddressCountryId,
                legalAddressLine1,
                legalAddressZipCode,
                invoicingEmail,
                vatNumber,
                customerGroupId,
            });

            if (data && data.saveCustomer) {
                customer = { id: data.saveCustomer.id } as CustomerDetail;
                await customerService.upload(files, customer.id);

                await push(urls.customer.detail, customer.id);
            }
        }
    };
</script>

<form autocomplete="off">
    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        {$_('page.customers.add.internalInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.customers.add.description.internalInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                <label
                                    for="display_name"
                                    class="block text-sm font-medium text-gray-700"
                                    >{$_('page.customers.add.displayName')}</label
                                >

                                {#if $myForm.fields.displayName.errors.includes('required')}
                                    <label
                                        for="display_name"
                                        class="block text-sm font-small text-red-700"
                                        >{$_('page.customers.add.error.displayNameRequired')}</label
                                    >
                                {/if}

                                {#if $myForm.fields.displayName.errors.includes('min')}
                                    <label
                                        for="display_name"
                                        class="block text-sm font-small text-red-700"
                                        >{$_(
                                            'page.customers.add.error.displayNameMinLength',
                                        )}</label
                                    >
                                {/if}

                                {#if $myForm.fields.displayName.pending}
                                    <label
                                        for="display_name"
                                        class="block text-sm font-small text-gray-900"
                                        >{$_('page.customers.add.error.displayNameChecking')}</label
                                    >
                                {/if}

                                {#if $myForm.fields.displayName.errors.includes('validateDisplayName')}
                                    <label
                                        for="display_name"
                                        class="block text-sm font-small text-red-700"
                                        >{$_('page.customers.add.error.displayNameTaken')}</label
                                    >
                                {/if}

                                <input
                                    type="text"
                                    name="display_name"
                                    id="display_name"
                                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                                    autocomplete="disabled"
                                    bind:value={displayName}
                                    use:bindClass={{ form: myForm }}
                                    on:blur|preventDefault={() => myForm.validate()}
                                />
                            </div>
                        </div>

                        <div>
                            <label for="note" class="block text-sm font-medium text-gray-700">
                                {$_('page.customers.add.note')}
                            </label>
                            <div class="mt-1">
                                <textarea
                                    id="note"
                                    name="about"
                                    rows="3"
                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder={$_('page.customers.add.placeholder.note')}
                                    bind:value={note}
                                    use:bindClass={{ form: myForm }}
                                    on:blur|preventDefault={() => myForm.validate()}
                                />
                            </div>
                            <p class="mt-2 text-sm text-gray-500">
                                {$_('page.customers.add.description.note')}
                            </p>
                        </div>
                        <div>
                            <CustomerGroupSelect
                                id="customerGroupId"
                                onSelect={(id) => {
                                    customerGroupId = id;
                                }}
                                form={myForm}
                                {customerGroupId}
                                label={$_('page.customers.add.customerGroup')}
                            />
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
                        {$_('page.customers.add.legalInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.customers.add.description.legalInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                <label
                                    for="legal_name"
                                    class="block text-sm font-medium text-gray-700"
                                    >{$_('page.customers.add.legalName')}</label
                                >
                                <input
                                    type="text"
                                    name="display_name"
                                    id="legal_name"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                    bind:value={legalName}
                                    use:bindClass={{ form: myForm }}
                                    on:blur|preventDefault={() => myForm.validate()}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-4">
                                <label
                                    for="invoicing_email_address"
                                    class="block text-sm font-medium text-gray-700"
                                    >{$_('page.customers.add.invoicingEmailAddress')}</label
                                >
                                <input
                                    type="text"
                                    name="email_address"
                                    id="invoicing_email_address"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                    bind:value={invoicingEmail}
                                    use:bindClass={{ form: myForm }}
                                    on:blur|preventDefault={() => myForm.validate()}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label
                                    for="id_number"
                                    class="block text-sm font-medium text-gray-700"
                                    >{$_('page.customers.add.idNumber')}</label
                                >
                                <input
                                    type="text"
                                    name="first_name"
                                    id="id_number"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                    bind:value={idNumber}
                                    use:bindClass={{ form: myForm }}
                                    on:blur|preventDefault={() => myForm.validate()}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label
                                    for="vat_number"
                                    class="block text-sm font-medium text-gray-700"
                                    >{$_('page.customers.add.vatNumber')}</label
                                >
                                <input
                                    type="text"
                                    name="last_name"
                                    id="vat_number"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                    bind:value={vatNumber}
                                    use:bindClass={{ form: myForm }}
                                    on:blur|preventDefault={() => myForm.validate()}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <CountrySelect
                                    onSelect={handleSelectLegalAddressCountry}
                                    id="legalAddressCountryId"
                                    label={$_('page.customers.add.country')}
                                    countryId={legalAddressCountryId}
                                    form={myForm}
                                />
                            </div>

                            <div class="col-span-6">
                                <label
                                    for="billing_street_address"
                                    class="block text-sm font-medium text-gray-700"
                                    >{$_('page.customers.add.line1')}</label
                                >
                                <input
                                    type="text"
                                    name="street_address"
                                    id="billing_street_address"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                    bind:value={legalAddressLine1}
                                    use:bindClass={{ form: myForm }}
                                    on:blur|preventDefault={() => myForm.validate()}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label
                                    for="billing_city"
                                    class="block text-sm font-medium text-gray-700"
                                    >{$_('page.customers.add.city')}</label
                                >
                                <input
                                    type="text"
                                    name="city"
                                    id="billing_city"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                    bind:value={legalAddressCity}
                                    use:bindClass={{ form: myForm }}
                                    on:blur|preventDefault={() => myForm.validate()}
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                    for="billing_postal_code"
                                    class="block text-sm font-medium text-gray-700"
                                    >{$_('page.customers.add.zip')}</label
                                >
                                <input
                                    type="text"
                                    name="postal_code"
                                    id="billing_postal_code"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                    bind:value={legalAddressZipCode}
                                    use:bindClass={{ form: myForm }}
                                    on:blur|preventDefault={() => myForm.validate()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Break />

    <div>
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        Customer Public information
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">Information you can find out</p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div class="grid grid-cols-3 gap-6">
                            <div class="col-span-3 sm:col-span-2">
                                <label
                                    for="company_website"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Website
                                </label>
                                <div class="mt-1 flex rounded-md shadow-sm">
                                    <span
                                        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                                    >
                                        http://
                                    </span>
                                    <input
                                        type="text"
                                        name="company_website"
                                        id="company_website"
                                        class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                        autocomplete="disabled"
                                        placeholder="www.example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label for="about" class="block text-sm font-medium text-gray-700">
                                About
                            </label>
                            <div class="mt-1">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows="3"
                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <p class="mt-2 text-sm text-gray-500">
                                Brief description for your profile. URLs are hyperlinked.
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700"> Photo </label>
                            <div class="mt-2 flex items-center">
                                <span
                                    class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                                >
                                    <svg
                                        class="h-full w-full text-gray-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                </span>
                                <button
                                    type="button"
                                    class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">
                                Cover photo
                            </label>
                            <div
                                class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                            >
                                <div class="space-y-1 text-center">
                                    <svg
                                        class="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <div class="flex text-sm text-gray-600">
                                        <label
                                            for="file-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                class="sr-only"
                                                bind:files
                                            />
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
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
                        {$_('page.customers.add.contactInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.customers.add.description.contactInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label
                                    for="first_name"
                                    class="block text-sm font-medium text-gray-700"
                                    >First name</label
                                >
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label
                                    for="last_name"
                                    class="block text-sm font-medium text-gray-700">Last name</label
                                >
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-4">
                                <label
                                    for="email_address"
                                    class="block text-sm font-medium text-gray-700"
                                    >Email address</label
                                >
                                <input
                                    type="text"
                                    name="email_address"
                                    id="email_address"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="country" class="block text-sm font-medium text-gray-700"
                                    >Country / Region</label
                                >
                                <select
                                    id="country"
                                    name="country"
                                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                            </div>

                            <div class="col-span-6">
                                <label
                                    for="street_address"
                                    class="block text-sm font-medium text-gray-700"
                                    >Street address</label
                                >
                                <input
                                    type="text"
                                    name="street_address"
                                    id="street_address"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label for="city" class="block text-sm font-medium text-gray-700"
                                    >City</label
                                >
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label for="state" class="block text-sm font-medium text-gray-700"
                                    >State / Province</label
                                >
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                    for="postal_code"
                                    class="block text-sm font-medium text-gray-700"
                                    >ZIP / Postal</label
                                >
                                <input
                                    type="text"
                                    name="postal_code"
                                    id="postal_code"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    autocomplete="disabled"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Button on:click={saveCustomer} disabled={!$myForm.valid} />
    </div>
</form>
