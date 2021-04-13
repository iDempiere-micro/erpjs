<script lang="ts">
    import Select from 'svelte-select';
    import type {
        AccountingSchemeDetailPartsFragment,
        SaveAccountingSchemeMutation,
        SaveAccountingSchemeMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import gql from 'graphql-tag';
    import { SAVE_ACCOUNTING_SCHEME } from '../../lib/queries/accountingScheme';
    import { currenciesStore, ensureCurrenciesStore, mapCurrencies } from '../../lib/currency';
    import type { OnSelectParam, SelectItem } from '../../lib/select';

    export let accountingScheme: AccountingSchemeDetailPartsFragment | undefined;
    let displayName = accountingScheme?.displayName;
    let currencyIsoCode = accountingScheme?.currency?.isoCode;

    let selectedCurrencyValue: SelectItem | undefined;

    const handleSelectCurrency = (event: OnSelectParam) => {
        currencyIsoCode = '' + event.detail.value;
        myForm.validate();
    };

    ensureCurrenciesStore();

    const myForm = form(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required'],
            },
            currencyIsoCode: {
                value: currencyIsoCode,
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

    export const saveAccountingSchemeMutation = mutation<
        SaveAccountingSchemeMutation,
        SaveAccountingSchemeMutationVariables
    >(SAVE_ACCOUNTING_SCHEME);

    const saveAccountingScheme = async () => {
        console.log('****', {
            id: accountingScheme?.id,
            displayName,
            currencyIsoCode,
        });

        if (displayName && currencyIsoCode) {
            const { data } = await saveAccountingSchemeMutation({
                variables: {
                    id: accountingScheme?.id,
                    displayName,
                    currencyIsoCode,
                },
            });
            console.log('*** accountingScheme created', data?.saveAccountingScheme?.id);
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

                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-4">
                            <label for="currencies" class="block text-sm font-medium text-gray-700"
                                >Currencies</label
                            >
                            {#if $myForm.fields.currencyIsoCode.errors.includes('required')}
                                <label
                                    for="currencies"
                                    class="block text-sm font-small text-red-700">Required</label
                                >
                            {/if}
                            <Select
                                inputAttributes={{ id: 'currencies' }}
                                items={mapCurrencies($currenciesStore.currencies)}
                                selectedValue={selectedCurrencyValue}
                                on:select={handleSelectCurrency}
                            />
                        </div>
                    </div>

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            on:click|preventDefault={() => {
                                saveAccountingScheme();
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
